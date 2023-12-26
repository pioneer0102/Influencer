import { lazy } from 'react';

const LinkApp = lazy(() => import('./LinkApp'));

const LinkAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'links',
      element: <LinkApp />
    },
  ],
};

export default LinkAppConfig;
