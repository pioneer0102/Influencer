import { lazy } from 'react';

const ReportApp = lazy(() => import('./ReportApp'));

const ReportAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'report',
      element: <ReportApp />
    },
  ],
};

export default ReportAppConfig;
