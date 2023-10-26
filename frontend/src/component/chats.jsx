import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import {styled} from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useDispatch, useSelector } from 'react-redux';
import { SelectConversation } from '../app/slices/app';
import { socket, connectSocket } from '../socket';
import { FetchDirectConversations, SetCurrentConversation } from '../app/slices/conversation';

const ChatElement = ({id, user_id, name, msg, time, unread, online, about, isDesktop, setChatLayout}) => {
    const dispatch = useDispatch();
    const {room_id} = useSelector(state => state.app);
    const selectedChatId = room_id?.toString();

    let isSelected = selectedChatId === id;

    if (!selectedChatId) {
        isSelected = false;
    }

    const current_conversation = {
        id,
        user_id,
        name,
        img: `https://alliza.s3.us-east-1.amazonaws.com/${user_id}`,
        msg,
        time,
        unread,
        online,
        about,
    }

    return(
        <>
        <Box
        onClick={()=> {
            dispatch(SelectConversation({room_id: id}));
            dispatch(SetCurrentConversation(current_conversation));

            if (!isDesktop) {
                setChatLayout(1);
            }
        }}
        sx={{
            width: '100%',
            backgroundColor: isSelected && isDesktop ? 'primary.main' : 'secondary.light',
            '&:hover': {
                backgroundColor: isSelected && isDesktop ? 'primary.main' : 'primary.light',
                cursor: 'pointer'
            }
        }} p={2}>

            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Stack direction={'row'} spacing={2}>
                    {online ? 
                        <StyledBadge 
                            overlap='circular'
                            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                            variant='dot'
                        >
                            <Avatar alt={name} src={`https://alliza.s3.us-east-1.amazonaws.com/${user_id}`}/>
                        </StyledBadge> : 
                        <Avatar alt={name} src={`https://alliza.s3.us-east-1.amazonaws.com/${user_id}`}/>
                    }

                    <Stack spacing={0.3}>
                        <Typography variant='subtitle2'>{name}</Typography>
                        <Typography variant='caption'>{msg}</Typography>
                    </Stack>
                </Stack>

                <Stack spacing={2} alignItems={'center'}>
                    <Typography variant='caption' fontWeight={600}>{time}</Typography>
                    <Badge color='secondary' badgeContent={unread} />
                </Stack>
            </Stack>
        </Box>
        <Divider variant='inset' />
        </>
    );
}

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

const Search = styled('div')(() => ({
    position: 'relative',
    borderRadius: 20,
    backgroundColor: '#fff',
    marginRight: 2,
    marginLeft: 0,
    width: '90%'
}));

const SearchIconWrapper = styled('div')(() => ({
    padding: 8,
    height: '100%',
    position: 'absolute',
    pinterEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1,1,1,0),
        // vertical padding * font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        width: '100%'
    }
}));

function Chats({setChatLayout, setDashboardLayout, isDesktop}) {
    const {user} = useSelector(state => state.auth);
    const {conversations} = useSelector(state => state.conversation.direct_chat);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!socket) {
            connectSocket(user._id);
        }

        socket.emit("get_direct_conversations", { user_id: user._id }, (data) => {
            dispatch(FetchDirectConversations(data));
        });
    }, [user]);

    return (
        <Box sx={{position: 'relative', backgroundColor: 'secondary.light', boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)"}}>
            <Stack spacing={2} sx={{height: '100vh', width: '100%'}}>
                {!isDesktop && <>
                    <Stack 
                        m={'0 auto'} 
                        direction={'row'} 
                        alignItems={'center'} 
                        spacing={2} 
                        width={'100%'}
                        pt={2}
                    >
                        <ChevronLeftIcon color='secondary' fontSize='large' onClick={() => setDashboardLayout(prev => {
                            prev.set('layout', 'nav');
                            return prev;
                        }, {replace: true})}     
                        />
                        <Typography variant={'body1'} fontWeight={'bold'}>
                            Chats
                        </Typography>
                    </Stack>
                </>}

                <Stack sx={{width: '100%', alignItems: 'center', pt: isDesktop ? 2 : 0}} >
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon color='secondary' />
                        </SearchIconWrapper>
                        <StyledInputBase placeholder='Search' />
                    </Search>

                </Stack>

                <Divider />

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
                    <Stack>
                        {conversations?.map((chat, index) => {
                            return <ChatElement 
                                key={index} 
                                {...chat} 
                                isDesktop={isDesktop} 
                                setChatLayout={setChatLayout} />
                        })}
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    );
}

export default Chats;