import axios from 'axios';

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const SPOTIFY_API_ENDPOINT = 'https://api.spotify.com/v1';
const SPOTIFY_AXIOS_ENDPOINT = axios.create({ baseURL: SPOTIFY_API_ENDPOINT });

async function getAccessToken(refresh_token) {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });

  return response.json();
}
export async function getUsersPlaylists(refresh_token) {
  const { access_token } = await getAccessToken(refresh_token);
  return fetch(`${SPOTIFY_API_ENDPOINT}/me/playlists`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}
export async function getUsersTopTracks(refresh_token) {
  const { access_token } = await getAccessToken(refresh_token);
  try {
    const tracks = await SPOTIFY_AXIOS_ENDPOINT.get('/me/top/tracks', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        limit: 50,
        time_range: 'short_term',
      },
    });

    const { data } = tracks;
    //add track analysis data to each track
    data.items = await Promise.all(
      data?.items?.map(async (item) => {
        item.analysis = await getOneTrackAnalysis(refresh_token, item.id);
        return item;
      })
    );
    return data;
  } catch (e) {
    console.log(e);
    return e;
  }
}
export async function getOneTrackAnalysis(refresh_token, id) {
  const { access_token } = await getAccessToken(refresh_token);
  try {
    const trackFeatures = await SPOTIFY_AXIOS_ENDPOINT.get(
      `/audio-features/${id}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return trackFeatures?.data;
  } catch (e) {
    console.log(e);
    return e;
  }
}
