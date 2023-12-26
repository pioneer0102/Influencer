import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice
} from '@reduxjs/toolkit';
import { BASE_URL } from 'src/constants';

export const getUser = createAsyncThunk(
    'profileApp/getUser',
    async () => {
        const response = await axios.get(BASE_URL+'api/user');
        return response.data;
    }
);

export const updateUser = createAsyncThunk(
    'profileApp/updateUser',
    async () => {
        const response = await axios.get(BASE_URL+'api/admin/me');
        return response.data;
    }
);

const profileSlice = createSlice({
    name: 'profileApp/profile',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUser.fulfilled, (state, action) => {
                console.log(action.payload);
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                console.log(action.payload);
            })
    }
});

export default profileSlice.reducer;