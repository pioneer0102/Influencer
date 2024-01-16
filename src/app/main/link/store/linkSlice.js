import axios from 'axios';
import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice
} from '@reduxjs/toolkit';
import { BASE_URL } from 'src/constants';

export const getOffers = createAsyncThunk(
    'linkApp/getOffers',
    async () => {
        const response = await axios.get(BASE_URL + '/api/influencer/get_offer');
        return response.data;
    }
);

export const getChannels = createAsyncThunk(
    'linkApp/getChannels',
    async () => {
        const response = await axios.get(BASE_URL + '/api/channel');
        return response.data;
    }
);

export const getLinks = createAsyncThunk(
    'linkApp/getLinks',
    async (id) => {
        const response = await axios.get(BASE_URL + `/api/influencer/get_links?influencer_id=${id}`);
        return response.data;
    }
);

export const selectAllOffers = ({ linkApp }) => linkApp.link.allOffers;
export const selectAllChannels = ({ linkApp }) => linkApp.link.allChannels;
export const selectAllLinks = ({ linkApp }) => linkApp.link.allLinks;

const linkSlice = createSlice({
    name: 'linkApp/link',
    initialState: {
        allOffers: [],
        allChannels: [],
        allLinks: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOffers.fulfilled, (state, action) => {
                state.allOffers = action.payload;
            })
            .addCase(getChannels.fulfilled, (state, action) => {
                state.allChannels = action.payload;
            })
            .addCase(getLinks.fulfilled, (state, action) => {
                state.allLinks = action.payload;
            })
    }
});

export default linkSlice.reducer;