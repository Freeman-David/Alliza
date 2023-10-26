const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const AudioCall = require('../models/audioCall');
const VideoCall = require('../models/videoCall');
const PendingUser = require('../models/pendingUserModel');
const BussinesRequest = require('../models/buisnessRequests');
const crypto = require('crypto');
const AWS = require('../services/s3');
const { generateToken04 } = require("./zegoServerAssistant");
const Articles = require('../models/articles');
const Events = require('../models/events');
const Busboy = require('busboy');
const mongoose = require('mongoose');

const appID = process.env.ZEGO_APP_ID;
const serverSecret = process.env.ZEGO_SERVER_SECRET;

// @desc    Add pending user
// @route   POST /api/users
// @access  Public
const userRequest = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, phone } = req.body;
    const name = `${firstName} ${lastName}`;

    if (!name || !email) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    // Check if Registration already requested
    const registrationRequested = await PendingUser.findOne({email});

    if (registrationRequested) {
        res.status(400);
        throw new Error('Registration already requested');
    }

    // Check if user exists
    const userExists = await User.findOne({email});

    if (userExists) {
        res.status(400);
        throw new Error('User already exists!');
    }

    // Add Regitration to Pending user Collection
    const pendingUser = await PendingUser.create({
        name,
        email,
        phone,
    });

    if (pendingUser) {
        res.status(200).json({
            status: 'success',
            message: 'Registration requested succcessfully'
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }

});

// @desc    Register new company
// @route   POST /api/users/company-register
// @access  Public
const companyRequest = asyncHandler(async (req, res) => {
    const { contactName, companyName, email, phone, message } = req.body;

    const excitingCompany = await BussinesRequest.findOne({email: email});

    if (excitingCompany) {
        res.status(400);
        throw new Error('Registration already sent');
    }

    const body = `Hi Shoval, we have a new company who interested in neorodiverse.
                    
                        company name: ${companyName},
                        Email contact: ${email},
                        contact name: ${contactName},
                        phone number: ${phone},
                        message: ${message}.`;

    // TODO: Send email to shoval.

    // Add Regitration to Pending company Collection
    const pendingCompany = await BussinesRequest.create({
        contactName,
        email,
        phone,
        companyName,
        message
    });

    if (pendingCompany) {
        res.status(200).json({
            status: 'success',
            message: 'Registration requested succcessfully'
        });
    } else {
        res.status(400);
        throw new Error('Invalid data');
    }
});

// @desc    Register pending user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, phone} = req.body;

    const existingUser = await User.findOne({email});

    if (existingUser) {
        res.status(400);
        throw new Error('User already Registered');
    }

    // Generate password
    const password = name + 'age';

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = Object.assign(req.body, {password: hashedPassword, permission: 'user'});

    const newUser = User.cteate(userData);

    if (newUser) {
        res.status(200).json({
            status: 'success',
            message: 'User added successfully',
        });
    } else {
        res.status(400);
        throw new Error('Somthing went wrong');
    }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            permission: user.permission,
            about: user.description,
            role: user.role,
            stage: user.stage,
            county: user.county,
            mentor: user.mentor,
            therapist: user.therapist,
            careerAdvisor: user.careerAdvisor,
            communityLeader: user.communityLeader,
            meetings: user.meetings,
            softSkills: user.softSkills,
            skills: user.skills,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Public
const getMe = asyncHandler(async (req, res) => {
    const user = req.user; // We got the user from the protect middleware.
 
    res.status(200).json(user);
});

// @desc    Update user data
// @route   POST /api/users/update-me
// @access  Public
const updateMe = asyncHandler(async (req, res) => {
    const user = req.user;
    const {mentor, stage} = req.body;
    let message = 'Profile Updated successfully';

    if (!mentor && stage) {
        message = `move on to level ${stage}`;
    }

    if (mentor) {
        message = 'mentor updated successfully';
    }

    const updatedUser = await User.findByIdAndUpdate(user._id, req.body , {new: true});

    const userData = {
        _id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        permission: updatedUser.permission,
        about: updatedUser.description,
        role: updatedUser.role,
        stage: updatedUser.stage,
        county: updatedUser.county,
        mentor: updatedUser.mentor,
        therapist: updatedUser.therapist,
        careerAdvisor: updatedUser.careerAdvisor,
        communityLeader: updatedUser.communityLeader,
        meetings: updatedUser.meetings,
        softSkills: updatedUser.softSkills,
        skills: updatedUser.skills,
        token: req.headers.authorization.split(' ')[1],
    }

    res.status(200).json({
        status: 'success',
        data: userData,
        message
    });
});

// @desc    Forgot Password logic
// @route   POST /api/users/forgot-password
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
    const user = await User.findOne({email: req.body.email});

    if (!user) {
        res.status(400);

        throw new Error('There is no user with given email adderss');
    }

    const resetToken = User.createPasswordResetToken();

    const resetURL = `https://allizawork.com/reset-password/?token=${resetToken}`;

    try{
        // TODO: send email to user with reset URL

        res.status(200).json({
            status: 'success',
            message: 'Reset Password link sent to Email'
        });
    }
    catch(error) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;

        await user.save({validateBeforeSave: false});

        res.status(500);
        throw new Error('There was an error sending email, Please try again later');
    }
});

// @desc    Reset password logic
// @route   POST /api/users/reset-password
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const {passwordA, passwordB} = req.body;

    if (passwordA !== passwordB) {
        res.status(400);
        throw new Error('Passwords do not match');
    }

    const user = await User.findOne({
        passwordResetToken: token,
        passwordResetExpires: {$gt: Date.now()},
    });

    if (!user) {
        res.status(400);
        throw new Error('Token is invalid or expired');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.passwordA, salt);

    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    // TODO: sand informing email to user.
    
    res.status(200).json({
        status: 'success',
        message: 'Password reset successfully'
    });
});

// @desc    Get Users
// @route   GET /api/users/get-users
// @access  Public
const getUsers = asyncHandler(async (req, res, next) => {
    const allUsers = await User.find({}).select('name _id status permission');
    const thisUser = req.user;

    const remainingUsers = allUsers.filter(
        (user) => user._id.toString() !== thisUser._id.toString()
    );

    res.status(200).json({
        status: 'success',
        data: remainingUsers,
        message: 'Users found successfully'
    });
});

// @desc    Get Mentors
// @route   GET /api/users/get-mentors
// @access  Public
const getMentors = asyncHandler(async (req, res, next) => {
    await User.find({permission: 'mentor'}).select('_id scheduleLink description name').lean().exec(function(err, mentors) {
        if(err) {
            console.log(err);
        } else {
            res.status(200).json({
                status: 'success',
                data: mentors,
                message: 'mentors found successfully'
            });
        }
    });
});

// @desc    Start audio call
// @route   POST /api/users/start-audio-call
// @access  Public
const startAudioCall = asyncHandler(async (req, res, next) => {
    const from = req.user._id;
    const to = req.body.id;
  
    const from_user = await User.findById(from);
    const to_user = await User.findById(to);
  
    // create a new call audioCall Doc and send required data to client
    const new_audio_call = await AudioCall.create({
      participants: [from, to],
      from,
      to,
      status: "Ongoing",
    });
  
    res.status(200).json({
      data: {
        from: to_user,
        roomID: new_audio_call._id,
        streamID: to,
        userID: from,
        userName: from,
      },
    });
});

// @desc    Start video call
// @route   POST /api/users/start-video-call
// @access  Public
const startVideoCall = asyncHandler(async (req, res, next) => {
    const from = req.user._id;
    const to = req.body.id;

    const from_user = await User.findById(from);
    const to_user = await User.findById(to);

    // create a new call videoCall Doc and send required data to client
    const new_video_call = await VideoCall.create({
        participants: [from, to],
        from,
        to,
        status: "Ongoing",
    });

    res.status(200).json({
        data: {
        from: to_user,
        roomID: new_video_call._id,
        streamID: to,
        userID: from,
        userName: from,
        },
    });
});

// @desc    Generate Zego Token
// @route   POST /api/users/generate-zego-token
// @access  Public
const generateZegoToken = asyncHandler(async (req, res, next) => {
    try {
        const { userId, room_id } = req.body;
    
        console.log(userId, room_id, "from generate zego token");
    
        const effectiveTimeInSeconds = 3600; //type: number; unit: s; token expiration time, unit: second
        const payloadObject = {
          room_id, // Please modify to the user's roomID
          // The token generated allows loginRoom (login room) action
          // The token generated in this example allows publishStream (push stream) action
          privilege: {
            1: 1, // loginRoom: 1 pass , 0 not pass
            2: 1, // publishStream: 1 pass , 0 not pass
          },
          stream_id_list: null,
        }; //
        const payload = JSON.stringify(payloadObject);
        const token = generateToken04(
          appID * 1, // APP ID NEEDS TO BE A NUMBER
          userId,
          serverSecret,
          effectiveTimeInSeconds,
          payload
        );
        res.status(200).json({
          status: "success",
          message: "Token generated successfully",
          token,
        });
      } catch (err) {
        console.log(err);
      }
});

// @desc    Get Articles
// @route   GET /api/users/get-articles
// @access  Public
const getArticles = asyncHandler(async (req, res, next) => {
    await Articles.find({}).lean().exec(function(err, articles) {
        if(err) {
            console.log(err);
        } else {
            res.status(200).json({
                status: 'success',
                data: articles,
                message: 'articles found successfully'
            });
        }
    });
});

// @desc    Get Events
// @route   GET /api/users/get-events
// @access  Public
const getEvents = asyncHandler(async (req, res, next) => {
    await Events.find({}).lean().exec(function(err, articles) {
        if(err) {
            console.log(err);
        } else {
            res.status(200).json({
                status: 'success',
                data: articles,
                message: 'events found successfully'
            });
        }
    });
});

// @desc    Event Registration
// @route   POST /api/users/register-event
// @access  Public
const registerEvent = asyncHandler(async (req, res, next) => {
    const {eventId} = req.body;

    const event = await Events.findById(eventId);

    if(Object.values(event.participants).indexOf(mongoose.Types.ObjectId(req.user._id)) > -1) {
        res.status(400);
        throw new Error('You are already registered');
    }

    event.participants.push(req.user._id);
    
    event.save();

    res.status(200).json({
        message: 'registration send successfully'
    });
});

// @desc    Update Avatar
// @route   POST /api/users/update-avatar
// @access  Public
const updateAvatar = asyncHandler(async (req, res, next) => {
    const key = req.user._id;
    let img = {};
    const buffers = {};

    const busboy = Busboy({
        headers: req.headers,
        limits: {
            fileSize: 20 * 1024 * 1024, // 20 mb
        },
    });

    busboy.on('file', function(field, file, filename, enc, mime) {
        file.resume();
        buffers[field] = [] // add a new key to the buffers object

        file.on('data', data => {
            buffers[field].push(data);
        })

        file.on('end', function() {
            img = {
                fileBuffer: Buffer.concat(buffers[field]),
                fileType: mime,
                fileName: filename,
                fileEnc: enc,
            };
        });
    });

    busboy.on('finish', function() {
        AWS.S3.upload(
            {
                Key: key.toString(),
                Body: img.fileBuffer,
                ContentEncoding: img.fileEnc,
                ContentType: img.fileType,
            },
            (err, data) => {
                if(err) {
                    console.log(err);
                    res.status(400);
                    throw new Error('Somthing went wrong');
                } else {
                    res.status(200).json({
                        message: 'Avatar uploaded successfolly'
                    })
                }
            }
        );
    });

    req.pipe(busboy);
});

// Generate JWT
const generateToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

module.exports = {
    userRequest,
    updateMe,
    registerUser,
    companyRequest,
    loginUser,
    getMe,
    getUsers,
    forgotPassword,
    resetPassword,
    getMentors,
    startAudioCall,
    startVideoCall,
    generateZegoToken,
    getArticles,
    getEvents,
    registerEvent,
    updateAvatar,
}