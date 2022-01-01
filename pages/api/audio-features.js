import { getTracksAnalysis } from '../../src/lib/Spotify';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const { accessToken } = await getSession({ req });
  const items = await getTracksAnalysis(accessToken);
  if (items) {
    return res.status(200).json({ items });
  }
}
