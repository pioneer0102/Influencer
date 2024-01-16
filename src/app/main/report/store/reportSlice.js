import axios from 'axios';
import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice
} from '@reduxjs/toolkit';
import { BASE_URL } from 'src/constants';

export const getChartData = createAsyncThunk(
    'reportApp/getChartData',
    async () => {
        const response = await axios.get(BASE_URL + `/api/influencer/report/getdata_game_summary?start_date=${start_date}&end_date=${end_date}&currency=${currency}`);
        return response.data;
    }
);

export const getTableData = createAsyncThunk(
    'reportApp/getTableData',
    async () => {
        const response = await axios.get(BASE_URL + `/api/influencer/report/getdata_game_stats?start_date=${start_date}&end_date=${end_date}`);
        return response.data;
    }
)

const reportSlice = createSlice({
    name: 'reportApp/report',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => { 
        builder
            .addCase(getChartData.fulfilled, (state, action) => {
                console.log(action.payload);
            })
            .addCase(getTableData.fulfilled, (state, action) => {
                console.log(action.payload);
            })
    }
});

export default reportSlice.reducer;