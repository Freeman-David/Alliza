import Box from '@mui/material/Box';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from '@mui/material/Avatar';
import Switch from '@mui/material/Switch';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import {useEffect} from 'react';
import { ReactComponent as EditIcon } from '../../images/edit.svg';
import { ReactComponent as PortalIcon } from '../../images/portal.svg';
import { ReactComponent as EventIcon } from '../../images/event.svg';
import { ReactComponent as WorkshopIcon } from '../../images/workshop.svg';
import { ReactComponent as ChatIcom } from '../../images/chat.svg';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { Link, Outlet } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import {Navigate, useSearchParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { connectSocket, socket } from '../../socket';
import { SelectConversation } from "../../app/slices/app";
import {
    UpdateDirectConversation,
    AddDirectConversation,
    AddDirectMessage,
  } from "../../app/slices/conversation";
  import AudioCallNotification from "../../sections/chat/Audio/CallNotification";
  import VideoCallNotification from "../../sections/chat/Video/CallNotification";
  import {
    PushToAudioCallQueue,
    UpdateAudioCallDialog,
  } from "../../app/slices/audioCall";
  import AudioCallDialog from "../../sections/chat/Audio/CallDialog";
  import VideoCallDialog from "../../sections/chat/Video/CallDialog";
  import { PushToVideoCallQueue, UpdateVideoCallDialog } from "../../app/slices/videoCall";

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: theme.palette.primary.main,
      height: 35,
      width: 35,
      borderRadius: '50%',
      padding: 0
    },
    marginBottom: 10,
}));

const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 40,
    height: 18,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 16,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      color: theme.palette.primary.dark,
      '&.Mui-checked': {
        transform: 'translateX(22px)',
        color: theme.palette.secondary.main,
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.secondary.light,
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 14,
      height: 14,
      borderRadius: 7,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 18 / 2,
      opacity: 1,
      backgroundColor: theme.palette.primary.light,
      boxSizing: 'border-box',
    },
  }));

function Nav({ user }) {
    const avatarURL = `https://alliza.s3.us-east-1.amazonaws.com/${user?._id}`;

    const {conversations, currentConversation} = useSelector(state => state.conversation.direct_chat);
  const dispatch = useDispatch();

  const { open_audio_notification_dialog, open_audio_dialog } = useSelector(
    (state) => state.audioCall
  );
  const { open_video_notification_dialog, open_video_dialog } = useSelector(
    (state) => state.videoCall
  );

  const handleCloseAudioDialog = () => {
    dispatch(UpdateAudioCallDialog({ state: false }));
  };
  const handleCloseVideoDialog = () => {
    dispatch(UpdateVideoCallDialog({ state: false }));
  };

  useEffect(() => {
    if (user) {

      if(!socket) {
        connectSocket(user._id);
      }

      socket.on("audio_call_notification", (data) => {
        dispatch(PushToAudioCallQueue(data));
      });
      
      socket.on("video_call_notification", (data) => {
        dispatch(PushToVideoCallQueue(data));
      });

      socket.on("new_message", (data) => {
        const message = data.message;
        // check if msg we got is from currently selected conversation
        if (currentConversation?.id === data.conversation_id) {
          dispatch(
            AddDirectMessage({
              id: message._id,
              type: "msg",
              subtype: message.type,
              message: message.text,
              incoming: message.to === user._id,
              outgoing: message.from === user._id,
            })
          );
        }
      });

      socket.on('start_chat', (data) => {
        const existingConversation = conversations.find(conversation => (
          conversation.id === data._id
        ));

        if (existingConversation) {
          dispatch(UpdateDirectConversation({conversation: data}));
        } else {
          dispatch(AddDirectConversation({conversation: data}));
        }

        dispatch(SelectConversation({room_id: data._id}));
      });
    }

    return () => {
      socket?.off('start_chat');
      socket?.off("new_message");
      socket?.off("audio_call_notification");
      socket?.off("video_call_notification");
    }
  }, [user, conversations, dispatch, currentConversation?.id]);

    if(!user) {
        return <Navigate to={'/home-page'} />
    }

    if((user.permission === 'user' && user.stage === 1)) {
        return <Navigate to={'/step-1'} />
    }

    if((user.permission === 'user' && user.stage === 2)) {
        return <Navigate to={'/step-2'} />
    }

    const menu = [
        {
            text: "My Portal",
            name: 'portal',
            icon: <PortalIcon />,
        },
        {
            text: 'Sceduale a Session',
            name: 'scheduleSession',
            icon: <CalendarMonthOutlinedIcon color='secondary' fontSize='large' />,
        },
        {
            text: 'Chat',
            name: 'chat',
            icon: <ChatIcom />,
        },
        {
            text: "Alliza's Events",
            name: 'events',
            icon: <EventIcon />,
        },
        {
            text: "Alliza's Workshops",
            name: 'workshops',
            icon: <WorkshopIcon height={40} width={40} />,
        },
    ];

    return (
        <>
        <Grid container>
          <Grid item xs={12} md={3}>
                <Stack
                    height='100vh'
                    width='100%'
                    flexDirection='column'
                    spacing={2}
                    pt={5}
                    sx={{
                        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                    }}
                >
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={1}>
                        <Tooltip title="Profile & Accessibility Tools">
                            <Link to={'profile'}>
                                <StyledBadge 
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    badgeContent={
                                        <EditIcon sx={{height: 35, width: 35}} />
                                    }
                                >
                                    <Avatar src={avatarURL} alt={user.name} sx={{
                                        height: 75, width: 75,
                                    }}/>
                                </StyledBadge>
                            </Link>
                        </Tooltip>

                        <Stack spacing={1}>
                            <Typography variant='h2' pl={2} fontWeight={'bold'}>
                                {`Hi, ${user.name.split(' ')[0]}!`}
                            </Typography>
                        </Stack>
                        
                    </Stack>

                    <Typography variant='body1' fontWeight={'bold'} pt={2} textAlign={'center'}>
                        What do you want to do today?
                    </Typography>

                    <Stack direction={'column'} sx={{
                        flexGrow: 1,
                        overflowY: 'scroll',
                        height: '100%',
                        '&::-webkit-scrollbar': {
                            width: '12px !important',
                            height: '6px !important'
                        },
                        '&::-webkit-scrollbar-track': {
                            borderRadius: 0,
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'secondary.main',
                            borderLeft: '4px solid',
                            borderRight: '4px solid',
                            borderColor: 'primary.main'
                        }
                    }}>
                        {menu.map(item =>
                            <Box key={item.name} pr={1} pl={3} 
                                sx={{
                                    cursor: 'pointer', 
                                    // backgroundColor: selectedLayout === item.name ? '#e6e6e6' : '#fff',
                                    '&:hover': {
                                        backgroundColor: 'primary.light'
                                    }
                                }}
                            >
                                <Link to={item.name} style={{textDecoration: 'none', color: '#000'}}>
                                    <Stack
                                        direction={'row'}
                                        alignItems={'center'}
                                        justifyContent={'space-between'}
                                        height={100}
                                    >
                                        <Stack direction={'row'} alignItems={'center'} spacing={2} >
                                            {item.icon}
                                            <Typography variant='body1'>
                                                {item.text}
                                            </Typography>
                                        </Stack>

                                        <ChevronRightIcon color='secondary' />
                                    </Stack>
                                </Link>
                                <Divider />
                            </Box>
                        )}
                    </Stack>
                </Stack>
            </Grid>

            <Grid item xs={12} md={9} sx={{
                height: '100vh', 
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                flexGrow: 1,
                overflowY: 'auto',
            }}>
                <Outlet />
            </Grid>
        </Grid>

        {open_audio_notification_dialog && (
            <AudioCallNotification open={open_audio_notification_dialog} />
            )}
            {open_audio_dialog && (
            <AudioCallDialog
                open={open_audio_dialog}
                handleClose={handleCloseAudioDialog}
            />
            )}
            {open_video_notification_dialog && (
            <VideoCallNotification open={open_video_notification_dialog} />
            )}
            {open_video_dialog && (
            <VideoCallDialog
                open={open_video_dialog}
                handleClose={handleCloseVideoDialog}
            />
            )}
        </>
    );
}

export default Nav;