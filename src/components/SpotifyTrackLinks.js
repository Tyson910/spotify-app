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
