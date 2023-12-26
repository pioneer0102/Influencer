import Breadcrumb from 'app/shared-components/Breadcrumbs';

const breadCrumbs = [{ name: 'Links', url: null }];

const LinkHeader = () => {

    return (
        <div className="pt-24 px-24">
            <Breadcrumb breadCrumbs={breadCrumbs} />
        </div>
    );
};

export default LinkHeader;
