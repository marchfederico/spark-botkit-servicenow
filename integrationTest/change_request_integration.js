const expect = require('chai').expect;
const Nightmare = require('nightmare');
const env = require('node-env-file');
const nightmareHelpers = require('./nightmare_helpers.js');

env('.env');

describe('change request', () => {
  const changeRequestId = '9d457fbac6112287007379b57c6b2e60';

  it('should respond with change request status in a direct message and group message', () => {
    const nightmare = Nightmare({ show: true, waitTimeout: 60000 });
    return nightmare
      .use(nightmareHelpers.login)
      .use(nightmareHelpers.startPrivateConversation)
      .use(nightmareHelpers.sendMessage(`cr status ${changeRequestId}`))
      .use(nightmareHelpers.evaluateNextSNBotResponse)
      .then((dmCRStatus) => {
        const expectedCRStatus = new RegExp(`Information for change request: [${changeRequestId}]`);
        expect(dmCRStatus).to.match(expectedCRStatus);
        return nightmare
          .use(nightmareHelpers.goHome)
          .use(nightmareHelpers.startGroupConversation)
          .use(nightmareHelpers.sendMentionMessage(`cr status ${changeRequestId}`))
          .use(nightmareHelpers.evaluateNextSNBotResponse)
          .end()
          .then((mentionCRStatus) => {
            expect(mentionCRStatus).to.match(expectedCRStatus);
          });
      });
  });
});
