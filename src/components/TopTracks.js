import { useEffect, useState } from 'react';
import { SpotifyTracksContainer } from './SpotifyTrackLinks';
import { AudioAnalysis } from './AudioAnalysis';
import { Loading } from './Loading';
export function TopTracks() {
  const [tracks, setTracks] = useState();
  const [loading, setLoading] = useState(true);

  async function getMyTopTracks() {
    const res = await fetch('/api/top-tracks');
    const { items } = await res.json();
    setTracks(items);
    setLoading(false);
  }

  useEffect(() => {
    getMyTopTracks();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col container my-10">
      <AudioAnalysis tracks={tracks.map(({ analysis }) => analysis)} />
      <SpotifyTracksContainer tracks={tracks} />
    </div>
  );
}
