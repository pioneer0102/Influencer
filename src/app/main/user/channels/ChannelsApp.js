import reducer from './store';
import withReducer from 'app/store/withReducer';
import ChannelsHeader from "./components/ChannelsHeader";
import ChannelsTable from "./components/ChannelsTable";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getChannels } from './store/channelSlice';

const ChannelsApp = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getChannels());
    }, [dispatch]);
    return (
        <div>
            <ChannelsHeader />
            <ChannelsTable />
        </div>
    )
}

export default withReducer('channelsApp', reducer)(ChannelsApp);