import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

const scope =
  'user-read-private user-read-email user-read-recently-played user-library-read user-top-read';

const options = {
  providers: [
    SpotifyProvider({
      authorization: `https://accounts.spotify.com/authorize?scope=${scope.replace(
        ' ',
        ','
      )}`,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    }),
  ],
  debug: true,
  secret: process.env.SECRET,
  callbacks: {
    redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.refresh_token;
      }
      return token;
    },
    async session({session, token}) {
      // Add property to session, like an access_token from a provider.
      if (token) {
        session?.accessToken = token?.accessToken;
      }
      return session
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
