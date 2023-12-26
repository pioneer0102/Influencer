import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'User',
    title: 'USER',
    type: 'group',
    icon: 'heroicons-outline:home',
    translate: 'Users',
    children: [
      {
        id: 'User.profile',
        title: 'Profile',
        type: 'item',
        icon: 'heroicons-outline:user-circle',
        url: '/profile',
      },
      {
        id: 'User.channels',
        title: 'Channels',
        type: 'item',
        icon: 'heroicons-outline:video-camera',
        url: '/channels',
      }
    ]
  },
  {
    id: 'Activites',
    title: 'ACTIVITES',
    type: 'group',
    icon: 'heroicons-outline:home',
    translate: 'ACTIVITIES',
    children: [
      {
        id: 'Activites.links',
        title: 'Links',
        type: 'item',
        icon: 'heroicons-outline:link',
        url: '/links',
      }
    ]
  },
  {
    id: 'Report',
    title: 'REPORT',
    type: 'group',
    icon: 'heroicons-outline:home',
    translate: 'REPORT',
    children: [
      {
        id: 'report.Report',
        title: 'Report',
        type: 'item',
        icon: 'heroicons-outline:chart-bar',
        url: '/report',
      }
    ]
  }
];

export default navigationConfig;
