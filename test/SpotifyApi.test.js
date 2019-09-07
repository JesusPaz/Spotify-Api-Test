const request = require('request');
const { expect, assert } = require('chai');
const statusCode = require('http-status-codes');


describe('Spotify Api Test', () => {
  it('Test the Spotify access token', () => {
    const requestBody = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        grant_type: 'client_credentials'
      },
      headers: {
        Authorization: `Basic ${Buffer.from(`${process.env.clientId}:${process.env.clientSecret}`).toString('base64')}`
      },
      json: true
    };

    request.post(requestBody, (error, response, body) => {
      assert.isNull(error);
      expect(response.statusCode).to.equal(statusCode.OK);
      assert.exists(body.access_token, 'The token do not exists');
    });
  });
});
