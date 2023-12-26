import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice
} from '@reduxjs/toolkit';
import { BASE_URL } from 'src/constants';

export const getChannels = createAsyncThunk(
    'profileApp/getChannels',
    async () => {
        const response = await axios.get(BASE_URL+'/api/channel');
        return response.data;
    }
);

const channelSlice = createSlice({
    name: 'channelsApp/channel',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getChannels.fulfilled, (state, action) => {
                console.log(action.payload)
            })
    }
});

export default channelSlice.reducer;