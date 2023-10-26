import { createSlice } from "@reduxjs/toolkit";
import { socket } from "../../socket";
import axios from "../../utils/axios";

const initialState = {
  open_audio_dialog: false,
  open_audio_notification_dialog: false,
  call_queue: [], // can have max 1 call at any point of time
  incoming: false,
};

const slice = createSlice({
  name: "audioCall",
  initialState,
  reducers: {
    pushToAudioCallQueue(state, action) {
      if (state.call_queue.length === 0) {
        state.call_queue.push(action.payload.call);
        if (action.payload.incoming) {
          state.open_audio_notification_dialog = true;
          state.incoming = true;
        }
        else {
          state.open_audio_dialog = true;
          state.incoming = false;
        }
      } else {
        socket.emit("user_is_busy_audio_call", { ...action.payload });
      }

      // Ideally queue should be managed on server side
    },
    resetAudioCallQueue(state, action) {
      state.call_queue = [];
      state.open_audio_notification_dialog = false;
      state.incoming = false;
    },
    closeNotificationDialog(state, action) {
      state.open_audio_notification_dialog = false;
    },
    updateCallDialog(state, action) {
      state.open_audio_dialog = action.payload.state;
      state.open_audio_notification_dialog = false;
    },
  },
});

export default slice.reducer;

// ----------------------------------------------------------------------

export const StartAudioCall = (id) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.resetAudioCallQueue());
    axios
      .post(
        "api/users/start-audio-call",
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
          slice.actions.pushToAudioCallQueue({
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



export const PushToAudioCallQueue = (call) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.pushToAudioCallQueue({ call, incoming: true }));
  };
};

export const ResetAudioCallQueue = () => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.resetAudioCallQueue());
  };
};

export const CloseAudioNotificationDialog = () => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.closeNotificationDialog());
  };
};

export const UpdateAudioCallDialog = ({ state }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateCallDialog({ state }));
  };
};