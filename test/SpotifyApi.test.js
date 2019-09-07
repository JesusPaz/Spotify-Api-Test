const SpotifyWebApi = require('spotify-web-api-node');
const { expect, assert } = require('chai');
const statusCode = require('http-status-codes');


describe('Spotify Api Test', () => {
  it('Test the Spotify access token', async () => {
    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.clientId,
      clientSecret: process.env.clientSecret
    });

    assert.exists(spotifyApi.getAccessToken);
  });

  it('Serch a song', async () => {
    const spotifyApi = new SpotifyWebApi({
      clientId: process.env.clientId,
      clientSecret: process.env.clientSecret
    });
    spotifyApi.searchTracks('Till I Collapse')
      .then((data) => {
        expect(data.statusCode).to.equal(statusCode.OK);
        expect(data.body.tracks.items.length).to.equal(20);
      });
  });
});
