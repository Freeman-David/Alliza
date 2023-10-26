import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { ReplyMsg, TextMsg, TimeLine } from './messageTypes';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
    FetchCurrentMessages,
    SetCurrentConversation,
  } from "../app/slices/conversation";
  import { socket } from "../socket";

function Messages({menu}) {
    const dispatch = useDispatch();
    const {conversations, currentMessages} = useSelector(
        state => state.conversation.direct_chat
    );
    const {room_id} = useSelector(state => state.app);

    useEffect(() => {
        const current = conversations.find((el) => el?.id === room_id);
    
        socket.emit("get_messages", { conversation_id: current?.id }, (data) => {
          dispatch(FetchCurrentMessages({ messages: data }));
        });
    
        dispatch(SetCurrentConversation(current));
      }, [room_id]);

    return (
        <Box p={3}>
            <Stack spacing={3}>
                {currentMessages.map((msg, index) => {
                    switch (msg.type) {
                        case 'divider':  
                            return <TimeLine key={index} msg={msg} menu={menu}/>;
                        case 'msg':
                            switch (msg.subtype) {
                                case 'reply':
                                    return <ReplyMsg key={index} msg={msg} menu={menu}/>
                                default:
                                    return <TextMsg key={index} msg={msg} menu={menu}/>
                            }

                        default:
                            return <></>;
                    }
                })}
            </Stack>
        </Box>
    );
}



export default Messages;