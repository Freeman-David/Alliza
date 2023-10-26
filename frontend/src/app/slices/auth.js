import {createSlice} from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { showSnackbar } from './app';

// Get user from local storage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateIsLoading(state, action) {
            state.isError = action.payload.error;
            state.isLoading = action.payload.isLoading;
            state.isSuccess = action.payload.isSuccess;
        },
        login(state, action) {
            state.user = action.payload.user;
        },
        signOut(state, action) {
            state.user = null;
        },
        updateUser(state, action) {
            state.user = action.payload.user;
        },
    },
});

export default slice.reducer;

// Register user
export function registerUser (userData, openModal) {
    return async (dispatch, getState) => {
        dispatch(slice.actions.updateIsLoading({
            isLoading: true, 
            isError: false,
            isSuccess: false,
        }));

        await axios.post('api/users/', 
        userData, 
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(function (res) {
            dispatch(showSnackbar({
                severity: 'success', 
                message: res.data.message
            }));

            dispatch(slice.actions.updateIsLoading({
                isLoading: false,
                isError: false,
                isSuccess: true,
            }));

            openModal(true);
            
        }).catch(function (error) {
            dispatch(showSnackbar({ 
                severity: "error", 
                message: error.message 
            }));
            dispatch(slice.actions.updateIsLoading({ 
                isLoading: false, 
                isError: true,
                isSuccess: false,
            }));

            return false;
        });
    } 
};

// Register business
export function registerCompany (company, openModal) {
    return async (dispatch, getState) => {
        dispatch(slice.actions.updateIsLoading({
            isLoading: true, 
            isError: false,
            isSuccess: false,
        }));

        await axios.post('api/users/company-register', 
        company, 
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(function (res) {
            dispatch(showSnackbar({
                severity: 'success', 
                message: res.data.message
            }));

            dispatch(slice.actions.updateIsLoading({
                isLoading: false,
                isError: false,
                isSuccess: true
            }));

            openModal(true);

        }).catch(function (error) {
            dispatch(showSnackbar({ 
                severity: "error", 
                message: error.message 
            }));
            dispatch(slice.actions.updateIsLoading({ 
                isLoading: false, 
                isError: true,
                isSuccess: false
            }));
        });
    } 
};

// login
export function login (user) {
    return async (dispatch, getState) => {
        dispatch(slice.actions.updateIsLoading({
            isLoading: true, 
            isError: false,
            isSuccess: false,
        }));

        await axios.post('api/users/login', 
        user, 
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(function (res) {
            dispatch(slice.actions.login({
                user: res.data,
            }));

            window.localStorage.setItem('user', JSON.stringify(res.data));

            dispatch(showSnackbar({
                severity: 'success', 
                message: res.data.message
            }));

            dispatch(slice.actions.updateIsLoading({
                isLoading: false,
                isError: false,
                isSuccess: true,
            }))
        }).catch(function (error) {
            dispatch(showSnackbar({ 
                severity: "error", 
                message: error.message 
            }));
            dispatch(slice.actions.updateIsLoading({ 
                isLoading: false, 
                isError: true, 
                isSuccess: false
            }));
        });
    } 
};

export function logout () {
    return async (dispatch, getState) => {
        window.localStorage.removeItem("user");

        dispatch(slice.actions.signOut());
    }
}

export function forgotPassword(email) {
    return async (dispatch, getState) => {
        dispatch(slice.actions.updateIsLoading({ 
            isLoading: true, 
            isError: false,
            isSuccess: false 
        }));

        await axios.post(
            "api/users/forgot-password",
            email,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
        ).then(function (res) {
            dispatch(showSnackbar({ 
                severity: "success", 
                message: res.data.message 
            }));

            dispatch(slice.actions.updateIsLoading({ 
                isLoading: false, 
                isError: false,
                isSuccess: true 
            }));
        }).catch(function (error) {
            dispatch(showSnackbar({ 
                severity: "error", 
                message: error.message 
            }));

            dispatch(slice.actions.updateIsLoading({ 
                isLoading: false, 
                isError: true,
                isSuccess: false
            }));
        });
    }
}

export function resetPassword(data) {
    return async (dispatch, getState) => {
        dispatch(slice.actions.updateIsLoading({ 
            isLoading: true, 
            isError: false,
            isSuccess: false 
        }));
  
      await axios
        .post(
          "api/users/reset-password",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then(function (res) {
            dispatch(showSnackbar({ 
                severity: "success", 
                message: res.data.message 
            }));

            dispatch(slice.actions.updateIsLoading({ 
                isLoading: false, 
                isError: false,
                isSuccess: true
            }));
        }).catch(function (error) {
            dispatch(showSnackbar({ 
                severity: "error", 
                message: error.message 
            }));

            dispatch(slice.actions.updateIsLoading({ 
                isLoading: false, 
                isError: true,
                isSuccess: false 
            }));
        });
    };
}

export const UpdateAvatar = (file) => {
    return async (dispatch, getState) => {
        axios.post(
            "/api/users/update-avatar",
            { file },
            {
              headers: {
                "content-Type": "multipart/form-data",
                'encoding': "multipart/form-data",
                Authorization: `Bearer ${getState().auth.user.token}`,
              },
            }
          )
          .then((res) => {
            console.log(res);
            dispatch(showSnackbar({ 
                severity: "success", 
                message: res.data.message 
            }));
          })
          .catch((err) => {
            dispatch(showSnackbar({ 
                severity: "error", 
                message: err.message 
            }));
        });
    }
}

export const UpdateUserProfile = (formValues, navigate, link) => {
    return async (dispatch, getState) => {
        axios.post(
        "/api/users/update-me",
        { ...formValues },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.user.token}`,
          },
        }
      )
      .then((res) => {
        dispatch(slice.actions.updateUser({ user: res.data.data }));
        dispatch(showSnackbar({
            severity: 'success', 
            message: res.data.message
        }));

        if (navigate) navigate(link);
      })
      .catch((err) => {
        dispatch(showSnackbar({ 
            severity: "error", 
            message: err.message 
        }));
      });
    };
};