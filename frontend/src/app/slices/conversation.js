import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    direct_chat: {
        conversations: [],
        currentConversation: null,
        currentMessages: [],
    },
    group_chat: {},
}

const slice = createSlice({
    name: 'conversation',
    initialState,
    reducers: {
       fetchDirectConversations(state, action) {
            const user_id = JSON.parse(window.localStorage.getItem('user'))?._id;

            const list = action.payload.conversations.map(chat => {
                const user = chat.participants.find(
                    (elm) => elm._id.toString() !== user_id
                );

                return {
                    id: chat._id,
                    user_id: user._id,
                    name: user.name,
                    online: user.status === 'online',
                    img: `https://alliza.s3.us-east-1.amazonaws.com/${user._id}`,
                    msg: chat.messages.slice(-1)[0]?.text || user.description,
                    time: '9:36',
                    unread: 0,
                    about: user.desctiption,
                }
            });

            if(list) {
                state.direct_chat.conversations = list;
            } 
       },
       updateDirectConversation(state, action) {
            const user_id = JSON.parse(window.localStorage.getItem('user'))?._id;

            const thisConversation = action.payload.conversation;
            state.direct_chat.conversations = state.direct_chat.conversations.map(el => {
                if(el.id !== thisConversation._id) {
                    return el;
                } else {
                    const user = thisConversation.participants.find(el => el._id.toString() !== user_id);

                    return {
                        id: thisConversation._id,
                        user_id: user._id,
                        name: user.name,
                        online: user.status === 'online',
                        img: `https://alliza.s3.us-east-1.amazonaws.com/${user._id}`,
                        msg: thisConversation.messages.slice(-1)[0]?.text || user.description,
                        time: '10:45',
                        unread: 0,
                        about: user.description
                    }
                }
            })
       },
       addDirectConversation(state, action) {
        const user_id = JSON.parse(window.localStorage.getItem('user'))?._id;

        const thisConversation = action.payload.conversation;
        const user = thisConversation.participants.find(el => el._id.toString() !== user_id);

        state.direct_chat.conversations.push({
            id: thisConversation._id,
            user_id: user._id,
            name: user.name,
            online: user.status === 'online',
            img: `https://alliza.s3.us-east-1.amazonaws.com/${user._id}`,
            msg: thisConversation.messages.slice(-1)[0]?.text || user.description,
            time: '10:45',
            unread: 0,
            about: user.description
        });
       },
       setCurrentConversation(state, action) {
            state.direct_chat.currentConversation = action.payload;
      },
      fetchCurrentMessages(state, action) {
            const user_id = JSON.parse(window.localStorage.getItem('user'))?._id;
            const messages = action.payload.messages;
            const formatted_messages = messages.map((message) => ({
                id: message._id,
                type: "msg",
                subtype: message.type,
                message: message.text,
                incoming: message.to === user_id,
                outgoing: message.from === user_id,
            }));
            state.direct_chat.currentMessages = formatted_messages;
      },
      addDirectMessage(state, action) {
        state.direct_chat.currentMessages.push(action.payload.message);
      }
    }
});

export default slice.reducer;

export const FetchDirectConversations = (conversations) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.fetchDirectConversations({conversations}));
    }
}

export const UpdateDirectConversation = ({conversation}) => {
    return async (dispatch, getState) => {
         dispatch(slice.actions.updateDirectConversation({conversation}));
    }
}

export const AddDirectConversation = ({conversation}) => {
    return async (dispatch, getState) => {
        dispatch(slice.actions.addDirectConversation({conversation}));
    }
}

export const SetCurrentConversation = (current_conversation) => {
    return async (dispatch, getState) => {
      dispatch(slice.actions.setCurrentConversation(current_conversation));
    }
}

export const FetchCurrentMessages = ({messages}) => {
    return async(dispatch, getState) => {
        dispatch(slice.actions.fetchCurrentMessages({messages}));
    }
}

export const AddDirectMessage = (message) => {
    return async (dispatch, getState) => {
      dispatch(slice.actions.addDirectMessage({message}));
    }
}