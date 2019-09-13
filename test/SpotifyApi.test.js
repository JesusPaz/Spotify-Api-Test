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

  it('Test the search of the song "Till I Collapse" on Spotify', () => {
    const requestBodyAuth = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        grant_type: 'client_credentials'
      },
      headers: {
        Authorization: `Basic ${Buffer.from(`${process.env.clientId}:${process.env.clientSecret}`).toString('base64')}`
      },
      json: true
    };

    request.post(requestBodyAuth, (errorAuth, responseAuth, bodyAuth) => {
      const requestBodySearch = {
        url: 'https://api.spotify.com/v1/search?q=Till%20I%20Collapse&type=track',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${bodyAuth.access_token}`
        },
        json: true
      };

      request.get(requestBodySearch, (errorSearch, responseSearch, bodySearch) => {
        assert.isNull(errorSearch);
        expect(responseSearch.statusCode).to.equal(statusCode.OK);
        expect(bodySearch.tracks.items).to.have.lengthOf(20);
      });
    });
  });
});
