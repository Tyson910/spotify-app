import Image from 'next/image';
import { VALID_AUDIO_CATEGORIES } from '../lib/constants';
export function SpotifyTracksContainer({ tracks }) {
  return (
    <>
      <h2 className="text-center font-semibold md:text-4xl">
        Your Favorite Tracks
      </h2>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 
          my-12 p-10 gap-y-20 md:gap-x-12 md:max-h-[500px] 
          overflow-y-scroll bg-zinc-50 shadow-inner`}
      >
        {tracks?.map((track) => (
          <SpotifyTrackLink key={track.id} track={track} />
        ))}
      </div>
    </>
  );
}
export function SpotifyTrackLink({ track }) {
  const { id, name, album, artists, external_urls, analysis } = track;

  return (
    <div
      key={id}
      className="grid grid-cols-2 items-center gap-10 shadow-md rounded-lg p-5 border border-zinc-50 bg-white"
    >
      <a
        href={album?.external_urls?.spotify}
        rel="noopener noreferrer"
        target="_blank"
        className="relative md:w-52 md:h-52 hover:shadow-sm border-2 border-zinc-900"
      >
        <Image
          src={album?.images[0]?.url}
          alt={album?.images[0]?.alt}
          layout="fill"
        />
      </a>
      <div className="flex flex-col">
        <a
          href={external_urls?.spotify}
          rel="noopener noreferrer"
          target="_blank"
          className=""
        >
          {name}
        </a>
        <a href={artists[0]?.external_urls?.spotify}>{artists[0].name}</a>
        {VALID_AUDIO_CATEGORIES.map(({ category }) => (
          <TrackInfo
            key={category}
            category={category}
            value={analysis[category]}
          />
        ))}
      </div>
    </div>
  );
}

function TrackInfo({ category, value }) {
  return (
    <div className="flex flex-row capitalize gap-x-2 max-w-fit">
      <p>{category == 'tempo' ? 'Tempo (BPM)' : category}: </p>
      <p>
        {category == 'tempo' ? (
          Math.round(value)
        ) : (
          <>{(value * 100).toFixed(1)}%</>
        )}
      </p>
    </div>
  );
}
