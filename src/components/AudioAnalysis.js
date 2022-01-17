import { useState, useEffect } from 'react';
import { calcCategoryAverage } from '../utils/helpers';
import { VALID_AUDIO_CATEGORIES } from '../lib/constants';
import { Loading } from './Loading';
import { AudioFeatureMoreInfo } from './AudioFeatures';

export function AudioAnalysis({ tracks }) {
  const [audioFeatures, setAudioFeatures] = useState();
  const [loading, setLoading] = useState(true);

  async function getMyTopTracksAnalysis() {
    const allAveragesByCategory = VALID_AUDIO_CATEGORIES.map(
      ({ category, description }) => {
        const songData = {
          category,
          description,
          average: calcCategoryAverage(category, tracks),
          min: 0,
          max: 1.0,
        };
        if (category == 'tempo') {
          songData.min = 50;
          songData.max = 175;
        }
        return songData;
      }
    );
    setAudioFeatures(allAveragesByCategory);
    setLoading(false);
  }

  useEffect(() => {
    getMyTopTracksAnalysis();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="text-center mb-10">
        <h1 className="text-6xl font-semibold">Your Audio Profile</h1>
        <p className="text-2xl mt-5">
          Based On Averages Of Your Top 50 Favorite Tracks
        </p>
      </div>

      <div className="container flex flex-col mb-40 divide-y-2 divide-black border-t-2 border-b-2 border-black">
        {audioFeatures?.map((track) => (
          <AudioFeatureMoreInfo key={track.category} feature={track} />
        ))}
      </div>
    </>
  );
}


