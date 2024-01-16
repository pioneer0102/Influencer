import axios from 'axios';
import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice
} from '@reduxjs/toolkit';
import { BASE_URL } from 'src/constants';

export const getUser = createAsyncThunk(
    'profileApp/getUser',
    async () => {
        const response = await axios.get(BASE_URL + '/api/user');
        return response.data;
    }
);

export const updateUser = createAsyncThunk(
    'profileApp/updateUser',
    async (data) => {
        const response = await axios.patch(BASE_URL + '/api/admin/me', data);
        return response.data;
    }
);

export const selectUpdatedUser = ({ profileApp }) => profileApp.profile.user;

const profileSlice = createSlice({
    name: 'profileApp/profile',
    initialState: {
        user: {}
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUser.fulfilled, (state, action) => {
                console.log(action.payload);
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
    }
});

export default profileSlice.reducer;