import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  approved: {
    id: 'learner-dash.courseCard.banners.credit.approved',
    description: '[BW Custom]',
    defaultMessage: '{congratulations} {providerName} has approved your request for workshop credit. To see your workshop credit, visit the {linkToProviderSite} website.',
  },
  congratulations: {
    id: 'learner-dash.courseCard.banners.credit.congratulations',
    description: '',
    defaultMessage: 'Congratulations!',
  },
  eligible: {
    id: 'learner-dash.courseCard.banners.credit.eligible',
    description: '[BW Custom]',
    defaultMessage: 'You have completed this workshop and are eligible to purchase workshop credit.  Select {getCredit} to get started.',
  },
  eligibleFromProvider: {
    id: 'learner-dash.courseCard.banners.credit.eligibleFromProvider',
    description: '',
    defaultMessage: 'You are now eligible for credit from {providerName}. Congratulations!',
  },
  getCredit: {
    id: 'learner-dash.courseCard.banners.credit.getCredit',
    description: '',
    defaultMessage: 'Get Credit',
  },
  mustRequest: {
    id: 'learner-dash.courseCard.banners.credit.mustRequest',
    description: '[BW Custom]',
    defaultMessage: 'Thank you for your payment.  To receive workshop credit, you must request credit at the {linkToProviderSite} website.  Select {requestCredit} to get started',
  },
  received: {
    id: 'learner-dash.courseCard.banners.credit.received',
    description: '[BW Custom]',
    defaultMessage: '{providerName} has received your workshop credit request.  We will update you when credit processing is complete.',
  },
  rejected: {
    id: 'learner-dash.courseCard.banners.credit.rejected',
    description: '[BW Custom]',
    defaultMessage: '{providerName} did not approve your request for workshop credit.  For more information, contact {linkToProviderSite} directly.',
  },
  requestCredit: {
    id: 'learner-dash.courseCard.banners.credit.requestCredit',
    description: '',
    defaultMessage: 'Request Credit',
  },
  viewCredit: {
    id: 'learner-dash.courseCard.banners.credit.viewCredit',
    description: '',
    defaultMessage: 'View Credit',
  },
  viewDetails: {
    id: 'learner-dash.courseCard.banners.credit.viewDetails',
    description: '',
    defaultMessage: 'View Details',
  },
});

export default messages;
