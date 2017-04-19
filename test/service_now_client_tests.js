const serviceNowClient = require('../src/service_now_client.js');
const expect = require('chai').expect;
const request = require('request');
const sinon = require('sinon');

describe('service now client', () => {
  const serviceNowUsername = 'service now user';
  const serviceNowPassword = 'service now password';
  const serviceNowBaseUrl = 'service now base url';

  let testObject;

  beforeEach(() => {
    process.env.serviceNowUsername = serviceNowUsername;
    process.env.serviceNowPassword = serviceNowPassword;
    process.env.serviceNowBaseUrl = serviceNowBaseUrl;

    sinon.stub(request, 'get');

    testObject = serviceNowClient;
  });

  afterEach(() => {
    request.get.restore();
    delete process.env.serviceNowUsername;
    delete process.env.serviceNowPassword;
    delete process.env.serviceNowBaseUrl;
  });

  describe('getTableRecord', () => {
    it('should make get request once', () => {
      testObject.getTableRecord('table', 'id');
      expect(request.get.calledOnce);
    });

    it('should make get request to the correct url', () => {
      testObject.getTableRecord('sometable', 'some sys id');
      expect(request.get.args[0][0]).to.have.property('url', `${serviceNowBaseUrl}/api/now/v1/table/sometable/some sys id`);
    });

    it('should include auth in request', () => {
      testObject.getTableRecord('table', 'id');
      expect(request.get.args[0][0]).to.have.property('auth').that.deep.equal({
        user: serviceNowUsername,
        pass: serviceNowPassword,
      });
    });

    it('should include json in request', () => {
      testObject.getTableRecord('table', 'id');
      expect(request.get.args[0][0]).to.have.property('json', true);
    });

    it('should resolve with the record result on success', () => {
      const result = testObject.getTableRecord('table', 'id');
      const requestCallback = request.get.args[0][1];
      requestCallback(null, { statusCode: 200 }, { goodOle: 'json' });

      return result
          .then(response => expect(response).to.deep.equal({ goodOle: 'json' }));
    });

    it('should reject if error', () => {
      const result = testObject.getTableRecord('table', 'id');
      const requestCallback = request.get.args[0][1];
      requestCallback('error! error!', {}, {});

      return result
          .then(() => 'Failed. Expected rejection')
          .catch(error => error)
          .then(error => expect(error).to.equal('Error querying table: \'table\'. error! error!'));
    });

    [201, 300, 400, 500].forEach((status) => {
      it(`should reject if non response status code = ${status}`, () => {
        const result = testObject.getTableRecord('table', 'id');
        const requestCallback = request.get.args[0][1];
        requestCallback(null, { statusCode: status }, {});

        return result
            .then(() => 'Failed. Expected rejection')
            .catch(error => error)
            .then(error => expect(error).to.equal(`Error querying table: 'table'. Unexpected status code: ${status}`));
      });
    });
  });
});