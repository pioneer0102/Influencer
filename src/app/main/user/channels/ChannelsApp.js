import reducer from './store';
import withReducer from 'app/store/withReducer';
import ChannelsHeader from "./components/ChannelsHeader";
import ChannelsTable from "./components/ChannelsTable";

const ChannelsApp = () => {
    return (
        <div>
            <ChannelsHeader />
            <ChannelsTable />
        </div>
    )
}

export default withReducer('channelsApp', reducer)(ChannelsApp);