import { createSlice } from "@reduxjs/toolkit";
import axios from '../../utils/axios';

const initialState = {
    sidebar: {
        open: false,
        type: 'CONTACT', // can be CONTACT, STARRED.
    },
    snackbar: {
        open: false,
        message: null,
        severity: null,
    },
    chat_type: null,
    room_id: null,
    call_logs: [],
    mentors: [],
    articles: [],
    events: [],
};

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        fetchCallLogs(state, action) {
            state.call_logs = action.payload.call_logs;
        },
        fetchMentors(state, action) {
            state.mentors = action.payload.mentors;
        },
        FetchArticles(state, action) {
            state.articles = action.payload.articles;
        },
        FetchEvents(state, action) {
          state.events = action.payload.events;
      },
        toggleSidbar(state, action) {
            state.sidebar.open = !state.sidebar.open;
        },
        updateSidbarType(state, action) {
            state.sidebar.type = action.payload.type;
        },
        openSnackbar(state, action) {
            state.snackbar.open = true;
            state.snackbar.severity = action.payload.severity;
            state.snackbar.message = action.payload.message;
        },
        closeSnackbar(state, action) {
            state.snackbar.open = false;
            state.snackbar.severity = null;
            state.snackbar.message = null;
        },
        selectConversation(state, action) {
            state.chat_type = 'individual';
            state.room_id = action.payload.room_id;
        },
    }
});

export default slice.reducer;

export function ToggleSidbar() {
    return async (dispatch, getState) => {
        dispatch(slice.actions.toggleSidbar());
    }
}

export function UpdateSidbarType(type) {
    return async (dispatch, getState) => {
        dispatch(slice.actions.updateSidbarType({type}));
    }
}

export function showSnackbar(payload) {
    return async (dispatch, getState) => {
        dispatch(slice.actions.openSnackbar(payload));

        setTimeout(() => {
            dispatch(slice.actions.closeSnackbar());
        }, 4000);
    }
}

export function closeSnackbar() {
    return async (dispatch, getState) => {
        dispatch(slice.actions.closeSnackbar());
    }
}

export function SelectConversation({room_id}) {
    return (dispatch, getState) => {
        dispatch(slice.actions.selectConversation({room_id}))
    }
}

export const FetchCallLogs = () => {
    return async (dispatch, getState) => {
      axios
        .get("api/users/get-call-logs", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.user.token}`,
          },
        })
        .then((response) => {
          dispatch(slice.actions.fetchCallLogs({ call_logs: response.data.data }));
        })
        .catch((err) => {
          console.log(err);
        });
    };
};

export const FetchMentors = () => {
    return async (dispatch, getState) => {
      axios
        .get("api/users/get-mentors", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.user.token}`,
          },
        })
        .then((response) => {
          dispatch(slice.actions.fetchMentors({ mentors: response.data.data }));
        })
        .catch((err) => {
          console.log(err);
        });
    };
};

export const FetchArticles = () => {
    return async (dispatch, getState) => {
      axios
        .get("api/users/get-articles", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.user.token}`,
          },
        })
        .then((response) => {
          dispatch(slice.actions.FetchArticles({ articles: response.data.data }));
        })
        .catch((err) => {
          console.log(err);
        });
    };
};

export const FetchEvents = () => {
  return async (dispatch, getState) => {
    axios
      .get("api/users/get-events", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.user.token}`,
        },
      })
      .then((response) => {
        dispatch(slice.actions.FetchEvents({ events: response.data.data }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const RegisterEvent = (eventId) => {
  return async (dispatch, getState) => {
    axios
      .post("api/users/register-event", 
      {eventId},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.user.token}`,
        },
      })
      .then((response) => {
        dispatch(showSnackbar({
          severity: 'success',
          message: response.data.message,
        }));
      })
      .catch((err) => {
        dispatch(showSnackbar({
          severity: 'error',
          message: err,
        }));
      });
  };
};