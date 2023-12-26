import reducer from './store';
import withReducer from 'app/store/withReducer';
import LinkHeader from "./components/LinkHeader";
import LinkGenerator from './components/LinkGenerator';
import LinkTable from './components/LinkTable';

const LinkApp = () => {
    return (
        <div>
            <LinkHeader />
            <LinkGenerator />
            <LinkTable />
        </div>
    )
}

export default withReducer('linkApp', reducer)(LinkApp);