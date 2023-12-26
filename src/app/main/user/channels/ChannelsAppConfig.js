import { lazy } from 'react';

const ChannelsApp = lazy(() => import('./ChannelsApp'));

const ChannelsAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'channels',
      element: <ChannelsApp />
    },
  ],
};

export default ChannelsAppConfig;
