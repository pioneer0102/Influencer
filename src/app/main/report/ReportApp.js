import withReducer from "app/store/withReducer";
import reducer from "./store";
import ReportHeader from "./components/ReportHeader";

const ReportApp = () => {
    return (
        <div>
            <ReportHeader />
        </div>
    )
}

export default withReducer('reportApp', reducer)(ReportApp);