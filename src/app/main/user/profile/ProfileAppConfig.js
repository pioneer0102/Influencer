import { lazy } from 'react';

const ProfileApp = lazy(() => import('./ProfileApp'));

const ProfileAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'profile',
      element: <ProfileApp />
    },
  ],
};

export default ProfileAppConfig;
