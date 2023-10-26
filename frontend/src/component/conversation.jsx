import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Badge from '@mui/material/Badge';
import {styled} from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Messages from "./messages";
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import {useTheme} from "@mui/material/styles";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToggleSidbar } from "../app/slices/app";
import { StartAudioCall } from "../app/slices/audioCall";
import { StartVideoCall } from "../app/slices/videoCall";
import { socket } from "../socket";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));

  const StyleInput = styled(TextField)(({theme}) => ({
    '& .MuiInputBase-input': {
        paddingTop: '12px',
        paddingBottom: '12px', 
    }
  })); 

function ChatInput ({openPicker, setOpenPicker, setValue, value, inputRef}) {
    return(
        <StyleInput 
            inputRef={inputRef} 
            value={value}
            onChange={({target}) => {
                setValue(target.value);
            }}
            fullWidth 
            placeholder="Write a message..." 
            variant="filled" 
            InputProps={{
                disableUnderline: true, 
                endAdornment: 
                    <InputAdornment position="end">
                        <IconButton onClick={() => {setOpenPicker(!openPicker)}}>
                            <AddReactionOutlinedIcon />
                        </IconButton>
                    </InputAdornment>
            }} 
        />
    );
} 

function Conversation({setChatLayout, isDesktop}) {
    const theme = useTheme();
    const [openPicker, setOpenPicker] = useState(false);
    const [value, setValue] = useState('');
    const dispatch = useDispatch();

    const {currentConversation} = useSelector((state) => state.conversation.direct_chat);
    const {user} = useSelector(state => state.auth);
    const {sidebar, room_id} = useSelector(state => state.app);

    const inputRef = useRef(null);

    function handleEmojiClick(emoji) {
        const input = inputRef.current;

        if (input) {
            const selectionStart = input.selectionStart;
            const selectionEnd = input.selectionEnd;

            setValue(
                value.substring(0, selectionStart) +
                emoji + 
                value.substring(selectionEnd)
            );

            // Move the cursor to the end of the inserted emoji
            input.selectionStart = input.selectionEnd = selectionStart + 1;
        }
    }

  return (
    <Stack height={'100%'} maxHeight={'100vh'} width={'auto'}>

        {/* Chat Header */}
        <Box p={2} sx={{ width: '100%', backgroundColor: '#f8faff', boxShadow: '0 0 2px rgba(0,0,0,.25)'}}>
            <Stack alignItems={'center'} direction={'row'} justifyContent={'space-between'} sx={{width: '100%', height: '100%'}}>
                <Stack onClick={() => {dispatch(ToggleSidbar())}} direction={'row'} spacing={2}>
                    {!isDesktop && <ChevronLeftIcon color='secondary' fontSize='large' onClick={() => setChatLayout(0)} />}
                    <Box>
                        {currentConversation?.online ? <StyledBadge 
                            overlap='circular'
                            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                            variant='dot'
                        >
                            <Avatar 
                                alt={currentConversation?.name} 
                                src={currentConversation?.img} />
                        </StyledBadge> : 
                        <Avatar 
                                alt={currentConversation?.name} 
                                src={currentConversation?.img} />}

                    </Box>
                    <Stack spacing={0.2}>
                        <Typography variant="subtitle2" fontWeight={'bold'}>{currentConversation?.name}</Typography>
                        <Typography variant="caption">{
                            currentConversation?.online ? 'Online' : 'Offline'
                        }</Typography>
                    </Stack>
                </Stack>

                <Stack direction={'row'} alignItems={'center'} spacing={3}>
                    <IconButton onClick={() => {
                        dispatch(StartAudioCall(currentConversation.user_id));
                    }}>
                        <LocalPhoneOutlinedIcon />
                    </IconButton>

                    <IconButton onClick={() => {
                        dispatch(StartVideoCall(currentConversation.user_id));
                    }}>
                        <VideocamOutlinedIcon />
                    </IconButton>
                </Stack>
            </Stack>
        </Box>

        {/* Messages */}
        <ChatComponent />

        {/* Chat Footer */}
        <Box p={2} sx={{ width: '100%', backgroundColor: '#f8faff',boxShadow: '0 0 2px rgba(0,0,0,.25)'}}>
            <Stack direction={'row'} alignItems={'center'} spacing={2}>
               
                <Stack width={'100%'}>
                    <Box sx={{display: openPicker ? 'inline' : 'none', zIndex: 10, position: 'fixed', bottom: 81, right: 100}}>
                        <Picker 
                            data={data} 
                            onEmojiSelect={(emoji) => {
                                handleEmojiClick(emoji.native);
                            }} 
                            theme={theme.palette.mode} 
                        />
                    </Box>
                    
                    <ChatInput 
                        inputRef={inputRef}
                        value={value}
                        setValue={setValue}
                        openPicker={openPicker}
                        setOpenPicker={setOpenPicker}
                     />
                </Stack>

                <Box sx={{height: 48, width: 48, backgroundColor: 'secondary.main', borderRadius: 1.5}}>
                    <Stack sx={{height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                        <IconButton onClick={() => {
                            socket.emit('text_message', {
                                message: value,
                                conversation_id: room_id,
                                from: user._id,
                                to: currentConversation.user_id,
                                type: 'Text',
                            });

                            setValue('');
                        }}>
                            <SendOutlinedIcon sx={{color: '#fff'}} />
                        </IconButton>
                    </Stack> 
                </Box>
            </Stack>
        </Box>

    </Stack>
  );
}

const ChatComponent = () => {
    const messageListRef = useRef(null);
    const {currentMessages} = useSelector(state => state.conversation.direct_chat);

    useEffect(() => {
        //scroll to the bottom of the message list when new messages are added
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }, [currentMessages]);

    return(
        <Box ref={messageListRef} sx={{width: '100%', flexGrow: 1, height: '100%', overflowY: 'scroll'}}>
            <Messages menu={true}/>
        </Box>
    )
}

export default Conversation;