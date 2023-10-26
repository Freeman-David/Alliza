const path = require('path');
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss');
const http = require('http');
const {Server} = require('socket.io');
const colors = require('colors');
require('dotenv').config({path: "./vars/.env"});
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/userModel');
const connectDB = require('./config/db');
const {errorHandler} = require('./middleware/errorMiddleware');
const OneToOneMessage = require('./models/oneToOneMessage');
const port = process.env.PORT || 8000;

connectDB();
const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true,
}))

app.use(express.json({limit: '10kb'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-hashes'", "'unsafe-eval'", 'https://assets.calendly.com', 'https://allizawork.com/'],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://allizawork.com/', 'https://fonts.googleapis.com/', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/'],
      imgSrc: ["'self'", 'https://alliza.s3.us-east-1.amazonaws.com/', 'https://alliza.s3.amazonaws.com/', 'https://allizawork.com/', 'data:'],
      connectSrc: ["'self'", 'http://localhost:8000/', 'ws://localhost:8000/', 'https://allizawork.com/', 'ws://allizawork.com/'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com/', 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/'],
      objectSrc: ["'none'"],
      frameSrc: ["'self'", 'https://calendly.com'],
      manifestSrc: ['https://allizawork.com/']
    }
}));

const limiter = rateLimit({
  max: 3000,
  windowMs: 60 * 1000, // Limit 3000 request in one hour
  message: "Too many requests from this IP, Please try again in an hour",
});

app.use("/api", limiter);
app.use(express.urlencoded({ extended: true }));

app.use(mongoSanitize());
// app.use(xss());

process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1);
});

app.use("/api/users", require("./routs/userRouts"));

app.use(errorHandler);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

server.listen(port, "0.0.0.0", () =>
  console.log(`Server started on port ${port}`)
);

// socket event on connect for chat
io.on('connection', async (socket) => {
    console.log('socket connect');
    const userId = socket.handshake.query.user_id;
    const socketId = socket.id;

    console.log(`User connected ${userId}`);

    if (Boolean(userId)) {
        await User.findByIdAndUpdate(userId, {socketId, status: 'online'});
    }

    socket.on('get_direct_conversations', async ({user_id}, callback) => {
        const existingConversation = await OneToOneMessage.find({
            participants: {$all: [user_id]}
        }).populate('participants', 'name _id email status description');

        callback(existingConversation);
    });

    socket.on('start_conversation', async (data) => {
        // data should be {to: '(id)', from: '(id)'}
        const {to, from} = data;

        // check if there is any existing conversation between these users
        const existingConversations = await OneToOneMessage.find({
            participants: {$size: 2, $all: [to, from]}
        }).populate('participants', 'name _id email status');

        if(existingConversations.length === 0) {
            // Create new chat room on DB
            let newChat = await OneToOneMessage.create({
                participants: [to, from],
                messages: [{to: from, from: to, createdAt: Date.now(), text: 'Hi, How are you doing?'}]
            });

            // In order to get the participants data
            newChat = await OneToOneMessage.findById(newChat._id).populate('participants', 'name _id email status');

            socket.emit('start_chat', newChat);
        } else {
            socket.emit('start_chat', existingConversations[0]);
        }
    });

    socket.on('get_messages', async ({conversation_id}, callback) => {
        const {messages} = await OneToOneMessage.findById(conversation_id).select('messages');

        callback(messages)
    });

    // Handle messages
    socket.on('text_message', async (data) => {
        // data should be {to:'(id)',from:'(id)',message,conversation_id,type}

        const {to, from, message, conversation_id} = data;

        const from_user = await User.findById(from);
        const to_user = await User.findById(to);

        const new_message = {
            to,
            from,
            text: message,
            createdAt: Date.now(),
        }

        const chat = await OneToOneMessage.findById(conversation_id);
        chat.messages.push(new_message);
        await chat.save({});

        // emit the message to users
        io.to(to_user.socketId).emit('new_message', {
            conversation_id,
            message: new_message,
        });
        io.to(from_user.socketId).emit('new_message', {
            conversation_id,
            message: new_message,
        });
    });

    socket.on('end', async ({userId}) => {
        if(userId) {
            await User.findByIdAndUpdate(userId, {status: 'offline'});
        }

        socket.disconnect(0);
    });
});

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    );
  });
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
