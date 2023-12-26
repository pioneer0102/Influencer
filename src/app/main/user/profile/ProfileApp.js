import reducer from './store';
import withReducer from "app/store/withReducer";
import ProfileHeader from "./components/ProfileHeader";
import ProfileForm from "./components/ProfileForm";

const ProfileApp = () => {
    return (
        <div>
            <ProfileHeader />
            <ProfileForm />
        </div>
    )
}

export default withReducer('profileApp', reducer)(ProfileApp);