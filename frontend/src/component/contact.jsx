import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import { ToggleSidbar, UpdateSidbarType } from "../app/slices/app";
import Avatar from "@mui/material/Avatar";
import Switch from "@mui/material/Switch";
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import Divider from "@mui/material/Divider";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { StartAudioCall } from "../app/slices/audioCall";
import { StartVideoCall } from "../app/slices/videoCall";

const label = { inputProps: { 'aria-label': 'Switch Notifications' }, sx:{'& .MuiSwitch-thumb': {backgroundColor: 'secondary.main'}, '&.Mui-checked': {'& .MuiSwitch-thumb': {backgroundColor: 'secondary.main'}}, '& .MuiSwitch-track': {backgroundColor: 'primary.dark'}} };

function Contact() {

    const dispatch = useDispatch();
    const {currentConversation} = useSelector(state => state.conversation.direct_chat);

  return (
    <Box sx={{ height: '100vh', backgroundColor: '#f8faff'}}>
        <Stack height={'100%'}>

            {/* Header */}
            <Box sx={{width: '100%', boxShadow: '0 0 2px rgba(0,0,0,.25)'}}>
                <Stack direction={'row'} sx={{height: '100%', p: 2}} alignItems={'center'} justifyContent={'space-between'} spacing={3}>
                    <Typography variant="subtitle2">
                        Contact Info
                    </Typography>
                    <IconButton onClick={() => {dispatch(ToggleSidbar())}}>
                        <CloseIcon />
                    </IconButton>
                </Stack>
            </Box>

            {/* Body */}
            <Stack sx={{height: '100%', position: 'relative', flexGrow: 1, overflowY: 'scroll'}} p={3} spacing={3}>
                <Stack alignItems={'center'} direction={'row'} spacing={2}>
                    <Avatar
                        src={currentConversation?.img} 
                        alt={currentConversation?.name} 
                        sx={{height: 64, width: 64}} />
                    <Typography variant="article" fontWeight={600}>
                        {currentConversation?.name}
                    </Typography>
                </Stack>

                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-evenly'}>

                    <Stack spacing={1} alignItems={'center'}>
                        <IconButton onClick={() => {
                            dispatch(StartAudioCall(currentConversation.user_id));
                        }}>
                            <LocalPhoneOutlinedIcon  />
                        </IconButton>
                        <Typography variant="overline">Voice</Typography>
                    </Stack>
                    <Stack spacing={1} alignItems={'center'}>
                        <IconButton onClick={() => {
                            dispatch(StartVideoCall(currentConversation.user_id));
                        }}>
                            <VideocamOutlinedIcon />
                        </IconButton>
                        <Typography variant="overline">Video</Typography>
                    </Stack>
                    
                </Stack>

                <Divider />

                <Stack spacing={.5}>
                    <Typography variant="article">
                        About
                    </Typography>
                    <Typography variant="body2">
                        {currentConversation?.about}
                    </Typography>
                </Stack>

                <Divider />

                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Stack direction={'row'} alignItems={'center'} spacing={2} width={'100%'}>
                        <StarOutlineIcon />
                        <Typography variant="subtitle2">
                            Starred Messages
                        </Typography>
                    </Stack>
                    <IconButton onClick={() => {dispatch(UpdateSidbarType('STARRED'))}}>
                        <KeyboardArrowRightIcon />
                    </IconButton>
                </Stack>
                
                <Divider />

                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Stack direction={'row'} alignItems={'center'} spacing={2} width={'100%'}>
                        <NotificationsNoneIcon />
                        <Typography variant="subtitle2">
                            Mute Notifications
                        </Typography>
                    </Stack>
                    <Switch color="secondary" {...label} />
                </Stack>

                <Divider />

            </Stack>
        </Stack>
    </Box>
  )
}

export default Contact;