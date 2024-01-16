import './api/auth-api';
import './api/user-api';
import './api/notifications-api';
import './api/channel-api';
import './api/link-api';
import history from '@history';
import mock from './mock';

mock.onAny().passThrough();

if (module?.hot?.status() === 'apply') {
  const { pathname } = history.location;
  history.push('/loading');
  history.push({ pathname });
}
