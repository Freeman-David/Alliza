import { createSlice } from "@reduxjs/toolkit";
import { socket } from "../../socket";
import axios from "../../utils/axios";

const initialState = {
  open_video_dialog: false,
  open_video_notification_dialog: false,
  call_queue: [], // can have max 1 call at any point of time
  incoming: false,
};

const slice = createSlice({
  name: "videoCall",
  initialState,
  reducers: {
    pushToVideoCallQueue(state, action) {
      if (state.call_queue.length === 0) {
        state.call_queue.push(action.payload.call);
        if (action.payload.incoming) {
          state.open_video_notification_dialog = true; 
          state.incoming = true;
        }
        else {
          state.open_video_dialog = true;
          state.incoming = false;
        }
      } else {
        socket.emit("user_is_busy_video_call", { ...action.payload });
      }

      // Ideally queue should be managed on server side
    },
    resetVideoCallQueue(state, action) {
      state.call_queue = [];
      state.open_video_notification_dialog = false;
      state.incoming = false;
    },
    closeNotificationDialog(state, action) {
      state.open_video_notification_dialog = false;
    },
    updateCallDialog(state, action) {
      state.open_video_dialog = action.payload.state;
      state.open_video_notification_dialog = false;
    },
  },
});

export default slice.reducer;

// ----------------------------------------------------------------------

export const StartVideoCall = (id) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.resetVideoCallQueue());
    axios
      .post(
        "api/users/start-video-call",
        { id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.user.token}`,
          },
        }
      )
      .then((response) => {
        dispatch(
          slice.actions.pushToVideoCallQueue({
            call: response.data.data,
            incoming: false,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const PushToVideoCallQueue = (call) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.pushToVideoCallQueue({call, incoming: true}));
  };
};

export const ResetVideoCallQueue = () => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.resetVideoCallQueue());
  };
};

export const CloseVideoNotificationDialog = () => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.closeNotificationDialog());
  };
};

export const UpdateVideoCallDialog = ({ state }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateCallDialog({ state }));
  };
};