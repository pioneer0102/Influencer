import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice
} from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from 'src/constants';

export const getChannels = createAsyncThunk(
    'profileApp/getChannels',
    async () => {
        const response = await axios.get(BASE_URL + '/api/channel');
        return response.data;
    }
);

const channelsAdapter = createEntityAdapter({});

export const { selectAll: selectAllChannels } = channelsAdapter.getSelectors((state) => state.channelsApp.channel);

export const addChannel = createAsyncThunk(
    'profileApp/addChannel',
    async (data) => {
        const response = await axios.post(BASE_URL + '/api/channel', data);
        return response.data;
    }
);

export const getChannel = createAsyncThunk(
    'profileApp/getChannel',
    async (id) => {
        const response = await axios.get(BASE_URL + `/api/channel/${id}`);
        return response.data;
    }
);

export const updateChannel = createAsyncThunk(
    'profileApp/updateChannel',
    async (updatedData) => {
        const { id, data } = updatedData;
        const response = await axios.patch(BASE_URL + `/api/channel/${id}`, data);
        return response.data;
    }
);

export const removeChannel = createAsyncThunk(
    'profileApp/removeChannel',
    async (id) => {
        const response = await axios.delete(BASE_URL + `/api/channel/${id}`);
        return response.data;
    }
);

export const selectChannel = ({ channelsApp }) => channelsApp.channel.channel;

const channelSlice = createSlice({
    name: 'channelsApp/channel',
    initialState: channelsAdapter.getInitialState({
        channel: {}
    }),
    reducers: {
        initializeChannel: (state, action) => {
            state.channel = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getChannels.fulfilled, (state, action) => {
                channelsAdapter.setAll(state, action.payload);
            })
            .addCase(addChannel.fulfilled, (state, action) => {
                channelsAdapter.addOne(state, action.payload);
            })
            .addCase(getChannel.fulfilled, (state, action) => {
                state.channel = action.payload;
            })
            .addCase(updateChannel.fulfilled, (state, action) => {
                channelsAdapter.upsertOne(state, action.payload);
            })
            .addCase(removeChannel.fulfilled, (state, action) => {
                channelsAdapter.removeOne(state, action.payload);
            })
    }
});

export const { initializeChannel } = channelSlice.actions;

export default channelSlice.reducer;