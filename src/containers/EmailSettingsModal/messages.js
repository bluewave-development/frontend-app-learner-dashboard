/* eslint-disable quotes */
import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  header: {
    id: 'learner-dash.emailSettings.header',
    description: '[BW Custom]Header for email settings modal',
    defaultMessage: 'Receive workshop emails?',
  },
  emailsOff: {
    id: 'learner-dash.emailSettings.emailsOff',
    description: '[BW Custom]Toggle text for email settings modal when email is disabled',
    defaultMessage: 'Workshop emails are off',
  },
  emailsOn: {
    id: 'learner-dash.emailSettings.emailsOn',
    description: '[BW Custom]Toggle text for email settings modal when email is enabled',
    defaultMessage: 'Workshop emails are on',
  },
  description: {
    id: 'learner-dash.emailSettings.description',
    description: '[BW Custom]Description for email settings modal',
    defaultMessage: 'Workshop emails include important information about your workshop from instructors.',
  },
  nevermind: {
    id: 'learner-dash.emailSettings.nevermind',
    description: 'Cancel action for email settings modal',
    defaultMessage: 'Never mind',
  },
  save: {
    id: 'learner-dash.emailSettings.save',
    description: 'Save action for email settings modal',
    defaultMessage: 'Save settings',
  },

});

export default messages;
