export const VALID_AUDIO_CATEGORIES = [
  {
    category: 'tempo',
    description: `The overall estimated tempo of a track in beats per minute (BPM).
          In musical terminology, tempo is the speed or pace of a given piece and derives 
          directly from the average beat duration.`,
  },
  {
    category: 'acousticness',
    description: `A confidence measure from 0.0 to 1.0 of 
        whether the track is acoustic. 1.0 represents high confidence the track is acoustic.`,
  },
  {
    category: 'danceability',
    description: `Danceability describes how suitable a track is for dancing
           based on a combination of musical elements including tempo, rhythm stability, 
           beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.`,
  },
  {
    category: 'energy',
    description: `Energy is a measure from 0.0 to 1.0 and 
          represents a perceptual measure of intensity and activity. 
          Typically, energetic tracks feel fast, loud, and noisy. 
          For example, death metal has high energy, while a Bach prelude scores low on the scale. 
          Perceptual features contributing to this attribute include dynamic range, perceived loudness, 
          timbre, onset rate, and general entropy.`,
  },
  {
    category: 'instrumentalness',
    description: `Predicts whether a track contains no vocals. 
          "Ooh" and "aah" sounds are treated as instrumental in this context. 
          Rap or spoken word tracks are clearly "vocal". 
          The closer the instrumentalness value is to 1.0, 
          the greater likelihood the track contains no vocal content. 
          Values above 0.5 are intended to represent instrumental tracks, 
          but confidence is higher as the value approaches 1.0.`,
  },
  {
    category: 'valence',
    description: `A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. 
          Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), 
          while tracks with low valence sound more negative (e.g. sad, depressed, angry).`,
  },
];
