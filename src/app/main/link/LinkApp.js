import reducer from './store';
import withReducer from 'app/store/withReducer';
import LinkHeader from "./components/LinkHeader";
import LinkGenerator from './components/LinkGenerator';
import LinkTable from './components/LinkTable';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'app/store/userSlice';
import {
    getOffers,
    getChannels,
    getLinks
} from './store/linkSlice';

const LinkApp = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    useEffect(() => {
        dispatch(getChannels());
        dispatch(getOffers());
        dispatch(getLinks(user.user_id.toString()))
    }, [dispatch]);
    return (
        <div>
            <LinkHeader />
            <LinkGenerator />
            <LinkTable />
        </div>
    )
}

export default withReducer('linkApp', reducer)(LinkApp);