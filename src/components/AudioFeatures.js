export function AudioFeatureMoreInfo({ feature }) {
  const { category, description, average } = feature;
  return (
    <div className="space-y-2 py-5">
      <p className="capitalize font-bold text-xl">{category}</p>
      <p>{description}</p>
      {category == 'tempo' ? (
        <p className="text-xl font-medium">Average BPM: {`${average}`}</p>
      ) : (
        <AudioFeatureMeter feature={feature} />
      )}
    </div>
  );
}

function AudioFeatureMeter({ feature }) {
  const { category, average, max, min } = feature;
  return (
    <div className="relative">
      <p className="absolute">{min}</p>
      <p
        className="absolute font-medium"
        style={{ left: `${average * 100 - 2}%` }}
      >
        {average}
      </p>
      <p className="absolute right-0">{max}</p>
      <div className="max-w-full mt-5 pt-7">
        <span
          title={category}
          className="bg-black block h-4 md:h-8"
          style={{ width: `${average * 100}%` }}
        ></span>
      </div>
    </div>
  );
}
