import React from 'react';
import { useSelector } from 'react-redux';

import MasqueradeBar from 'containers/MasqueradeBar';
import { AppContext } from '@edx/frontend-platform/react';
import Header from '@edx/frontend-component-header';
import { reduxHooks } from 'hooks';
import urls from 'data/services/lms/urls';

import ConfirmEmailBanner from './ConfirmEmailBanner';

import { useLearnerDashboardHeaderMenu, findCoursesNavClicked } from './hooks';

import './index.scss';

export const LearnerDashboardHeader = () => {
  const { authenticatedUser } = React.useContext(AppContext);
  const { courseSearchUrl } = reduxHooks.usePlatformSettingsData();

  const courseData = useSelector((state) => state?.app?.courseData);
  const coursesList = (courseData && typeof courseData.useSelector !== 'function')
    ? Object.values(courseData)
    : [];

  const sortedCourses = coursesList.slice().sort((a, b) => {
    const dateA = new Date(a.enrollment?.lastEnrolled || 0);
    const dateB = new Date(b.enrollment?.lastEnrolled || 0);
    return dateB - dateA;
  });

  const lastWorkshop = sortedCourses.length > 0 ? sortedCourses[0] : null;
  const targetUrl = lastWorkshop?.courseRun?.resumeUrl || lastWorkshop?.courseRun?.homeUrl;
  const lastWorkshopUrl = targetUrl ? urls.baseAppUrl(targetUrl) : null;

  const exploreCoursesClick = () => {
    findCoursesNavClicked(urls.baseAppUrl(courseSearchUrl));
  };

  const learnerHomeHeaderMenu = useLearnerDashboardHeaderMenu({
    courseSearchUrl,
    authenticatedUser,
    exploreCoursesClick,
    lastWorkshopUrl,
  });

  return (
    <>
      <ConfirmEmailBanner />
      <Header
        mainMenuItems={learnerHomeHeaderMenu.mainMenu}
        secondaryMenuItems={learnerHomeHeaderMenu.secondaryMenu}
        userMenuItems={learnerHomeHeaderMenu.userMenu}
      />
      <MasqueradeBar />
    </>
  );
};

LearnerDashboardHeader.propTypes = {};

export default LearnerDashboardHeader;
