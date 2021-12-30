import { getUsersPlaylists } from '../../src/lib/Spotify';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const {accessToken }= await getSession({ req });
  const response = await getUsersPlaylists(accessToken);
  const { items } = await response.json();

  if (items) {
    return res.status(200).json({ items });
  }
}
