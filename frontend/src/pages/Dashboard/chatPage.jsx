import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Chats from "../../component/chats";
import Conversation from "../../component/conversation";
import Contact from "../../component/contact";
import { useSelector } from "react-redux";
import StarredMessages from "../../component/starredMessages";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import NoChatSVG from "../../assets/illustration/noChat";
import { useState } from "react";

function ChatPage({setDashboardLayout, isDesktop}) {
    const {sidebar, room_id, chat_type} = useSelector((store) => store.app);
    const [layout, setLayout] = useState(0);

    const mobileLayoutMap = {
        0: <Chats setChatLayout={setLayout} setDashboardLayout={setDashboardLayout} isDesktop={isDesktop} />,
        1: (
            <Box sx={{
            height: '100vh', 
            backgroundColor: 'primary.light'}}>
                <Conversation setChatLayout={setLayout} isDesktop={isDesktop} />
            </Box>
        ),
        2: <Contact isDesktop={isDesktop} />,
    }

    if (!isDesktop) {
        return mobileLayoutMap[layout];
    }

    return(
        <Grid container>

            <Grid item xs={12} sm={3.5}>
                <Chats isDesktop={isDesktop} />
            </Grid>

            <Grid item xs={12} sm={sidebar.open ? 5.5 : 8.5}>
                <Box sx={{
                    height: '100vh', 
                    backgroundColor: 'primary.light'}}>
                    {room_id !== null && chat_type === 'individual' ? <Conversation isDesktop={isDesktop} /> : 
                        <Stack spacing={2} sx={{height: '100%', width: '100%'}} alignItems={'center'} justifyContent={'center'}>
                            <NoChatSVG />
                            <Typography variant="subtitle2">
                                Select a conversation or start new one
                            </Typography>
                        </Stack> 
                    }
                    
                </Box>
            </Grid> 
            
            <Grid item xs={12} sm={sidebar.open ? 3 : 0}>
                {sidebar.open && (() => {
                    switch (sidebar.type) {
                            case 'CONTACT':
                                return <Contact/>
                            case 'STARRED':
                                return <StarredMessages/>
                            default:
                                break;
                    }
                })()}
            </Grid>
        </Grid>
    );
    
}

export default ChatPage;