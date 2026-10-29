import { getConfig } from '@edx/frontend-platform';

import urls from 'data/services/lms/urls';

import messages from './messages';

const getLearnerHeaderMenu = (
  formatMessage,
  courseSearchUrl,
  authenticatedUser,
  exploreCoursesClick,
) => ({
  mainMenu: [
    {
      type: 'item',
      href: '/',
      content: formatMessage(messages.course),
      isActive: true,
    },
    ...(getConfig().ENABLE_PROGRAMS ? [{
      type: 'item',
      href: `${urls.programsUrl()}`,
      content: formatMessage(messages.program),
    }] : []),

  ],
  secondaryMenu: [
    ...(getConfig().SUPPORT_URL ? [{
      type: 'item',
      href: `${getConfig().SUPPORT_URL}`,
      content: formatMessage(messages.help),
    }] : []),
  ],
  userMenu: [
    {
      heading: '',
      items: [
        {
          type: 'item',
          href: `${getConfig().LMS_BASE_URL}/dashboard`,
          content: formatMessage(messages.resumeLastWorkshopBW),
        },
        {
          type: 'item',
          href: `${getConfig().LMS_BASE_URL}/learner-dashboard`,
          content: formatMessage(messages.dashboard),
        },
        {
          type: 'item',
          href: `${getConfig().ACCOUNT_PROFILE_URL}/u/${authenticatedUser?.username}`,
          content: formatMessage(messages.profile),
        },
        {
          type: 'item',
          href: `${getConfig().ACCOUNT_SETTINGS_URL}`,
          content: formatMessage(messages.account),
        },
        {
          type: 'item',
          href: `${getConfig().BWSDP_URL}`,
          content: formatMessage(messages.goBackToBlueWaveBW),
          isActive: true,
        },
        {
          type: 'item',
          href: `${getConfig().LMS_BASE_URL}/admin`,
          content: formatMessage(messages.administrationPanelBW),
        },
        {
          type: 'item',
          href: `${getConfig().STUDIO_BASE_URL}`,
          content: formatMessage(messages.goToStudioBW),
        },
        ...(getConfig().ORDER_HISTORY_URL ? [{
          type: 'item',
          href: getConfig().ORDER_HISTORY_URL,
          content: formatMessage(messages.orderHistory),
        }] : []),
      ],
    },
    {
      heading: '',
      items: [
        {
          type: 'item',
          href: `${getConfig().LOGOUT_URL}`,
          content: formatMessage(messages.signOut),
        },
      ],
    },
  ],
}
);

export default getLearnerHeaderMenu;
