import Breadcrumb from 'app/shared-components/Breadcrumbs';

const breadCrumbs = [{ name: 'Profile', url: null }];

const ProfileHeader = () => {

    return (
        <div className="pt-24 px-24">
            <Breadcrumb breadCrumbs={breadCrumbs} />
        </div>
    );
};

export default ProfileHeader;
