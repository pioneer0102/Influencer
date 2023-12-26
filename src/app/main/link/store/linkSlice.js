import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice
} from '@reduxjs/toolkit';

const linkSlice = createSlice({
    name: 'linkApp/link',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {}
});

export default linkSlice.reducer;