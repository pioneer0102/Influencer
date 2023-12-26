import Breadcrumb from 'app/shared-components/Breadcrumbs';

const breadCrumbs = [{ name: 'Report', url: null }];

const ReportHeader = () => {

    return (
        <div className="pt-24 px-24">
            <Breadcrumb breadCrumbs={breadCrumbs} />
        </div>
    );
};

export default ReportHeader;