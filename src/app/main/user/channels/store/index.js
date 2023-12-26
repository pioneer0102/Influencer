import { combineReducers } from "@reduxjs/toolkit";
import channel from './channelSlice';

const reducer = combineReducers({
    channel
});

export default reducer;