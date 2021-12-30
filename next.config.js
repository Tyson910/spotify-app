module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'i.scdn.co',
      'blend-playlist-covers.spotifycdn.com',
      'seed-mix-image.spotifycdn.com',
      'daily-mix.scdn.co',
      'mosaic.scdn.co'
    ],
  },
  webpack: (config, { dev, isServer }) => {
    // Replace React with Preact only in client production build
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      });
    }

    return config;
  },
};
