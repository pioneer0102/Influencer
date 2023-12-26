import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice
} from '@reduxjs/toolkit';

const reportSlice = createSlice({
    name: 'reportApp/report',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {}
});

export default reportSlice.reducer;