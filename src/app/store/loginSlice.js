import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import JwtService from '../auth/services/jwtService';
import { setUser } from './userSlice';
import i18n from 'i18next';

// export const submitLogin = ({ email, password }) => async (dispatch) => {
//     return jwtService
//         .signInWithEmailAndPassword({email, password})
//         .then((user) => {
//             dispatch(setUserData(user));
//             dispatch(setFeedbackIcon(true));

//             return dispatch(loginSuccess());
//         })
//         .catch((error) => {
//             // return dispatch(loginError(errors));
//             dispatch(
//                 showMessage({
//                     message: error.message,
//                     autoHideDuration: 2000,
//                     anchorOrigin: {
//                         vertical  : 'top',
//                         horizontal: 'center'
//                     },
//                     variant: 'error'
//                 })
//             );
//         });
// };

// export const sendMail = createAsyncThunk('/user/email', async ({ email }, { dispatch, rejectWithValue }) => {
//     try {
//         const response = await api.post('/user/email', { email });
//         return response.data;
//     } catch (error) {
//         return rejectWithValue(error.response.data);
//     }
// });

// export const setNewPassword = createAsyncThunk('/user/password/reset', async (data, { dispatch, rejectWithValue }) => {
//     try {
//         const response = await api.post('/user/password/reset', data);
//         return response.data;
//     } catch (error) {
//         return rejectWithValue(error.response.data);
//     }
// })

export const loginWithGoogle = (data) => async (dispatch) => {
    return JwtService
        .signInWithGoogle(data)
        .then((user) => {
            dispatch(setUser(user));
            // dispatch(setFeedbackIcon(true));

            // return dispatch(loginSuccess());
        })
        .catch((error) => {
            dispatch(
                showMessage({
                    message: error.message,
                    autoHideDuration: 2000,
                    anchorOrigin: {
                        vertical  : 'top',
                        horizontal: 'center'
                    },
                    variant: 'error'
                })
            );
        });
};

// export const submitLoginWithFireBase = ({ email, password }) => async (dispatch) => {
//     if (!firebaseService.auth) {
//         return () => false;
//     }
//     return firebaseService.auth
//         .signInWithEmailAndPassword(email, password)
//         .then(() => {
//             return dispatch(loginSuccess());
//         })
//         .catch((error) => {
//             const emailErrorCodes = [
//                 'auth/email-already-in-use',
//                 'auth/invalid-email',
//                 'auth/operation-not-allowed',
//                 'auth/user-not-found',
//                 'auth/user-disabled',
//             ];
//             const passwordErrorCodes = ['auth/weak-password', 'auth/wrong-password'];
//             const response = [];

//             if (emailErrorCodes.includes(error.code)) {
//                 response.push({
//                     type: 'email',
//                     message: error.message,
//                 });
//             }

//             if (passwordErrorCodes.includes(error.code)) {
//                 response.push({
//                     type: 'password',
//                     message: error.message,
//                 });
//             }

//             if (error.code === 'auth/invalid-api-key') {
//                 dispatch(showMessage({ message: error.message }));
//             }

//             return dispatch(loginError(response));
//         });
// };

const initialState = {
    success: false,
    errors: [],
    isMailSending: false,
    mailResult: {},
    setPasswordResult: {}
};

const loginSlice = createSlice({
    name: 'auth/login',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.success = true;
            state.errors = [];
        },
        loginError: (state, action) => {
            state.success = false;
            state.errors = action.payload;
        },
    },
    extraReducers: (builder) => {},
});

export const { loginSuccess, loginError } = loginSlice.actions;

export default loginSlice.reducer;
