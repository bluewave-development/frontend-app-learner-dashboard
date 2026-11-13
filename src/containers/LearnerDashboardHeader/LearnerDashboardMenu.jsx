import { getConfig } from '@edx/frontend-platform';

import urls from 'data/services/lms/urls';

import messages from './messages';

const getJwtSuperuserFlag = () => {
  try {
    if (typeof document === 'undefined') return false;
    const match = document.cookie.match(/(?:^|;\s*)edx-jwt-cookie-header-payload=([^;]+)/);
    if (!match) return false;
    const parts = decodeURIComponent(match[1]).split('.');
    if (parts.length < 2) return false;
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
    const payload = JSON.parse(window.atob(padded));
    return Boolean(payload?.superuser || payload?.is_superuser);
  } catch (e) {
    return false;
  }
};

const isSuperuserUser = (authenticatedUser) => Boolean(
  authenticatedUser?.is_superuser
  || authenticatedUser?.isSuperuser
  || authenticatedUser?.superuser
  || getJwtSuperuserFlag(),
);

const getLearnerHeaderMenu = (
  formatMessage,
  courseSearchUrl,
  authenticatedUser,
  exploreCoursesClick,
  lastWorkshopUrl,
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
          href: lastWorkshopUrl || `${getConfig().LEARNER_DASHBOARD_URL || `${getConfig().LMS_BASE_URL}/learner-dashboard/`}`,
          content: formatMessage(messages.resumeLastWorkshopBW),
        },
        {
          type: 'item',
          href: `${getConfig().LEARNER_DASHBOARD_URL}`,
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
        ...(isSuperuserUser(authenticatedUser) ? [
          {
            type: 'item',
            href: `${getConfig().LMS_BASE_URL}/admin`,
            content: formatMessage(messages.administrationPanelBW),
          },
        ] : []),
        /*En la cookie del LMS en la propiedad administrator tanto como el SU y el staf vienen aqui incluir la propiedad user.is_staff y  is_staff=True, por eso splica para ambos, tanto el staff como el administrator.*/
        ...(authenticatedUser?.administrator ? [
          {
            type: 'item',
            href: `${getConfig().STUDIO_BASE_URL}`,
            content: formatMessage(messages.goToStudioBW),
          },
        ] : []),
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
