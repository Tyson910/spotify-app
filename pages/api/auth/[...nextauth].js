import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

const isProd = process.env.NODE_ENV == 'production'
const scope =
  'user-read-private user-read-email user-read-recently-played user-library-read user-top-read'.replace(
    ' ',
    ','
  );

const options = {
  providers: [
    SpotifyProvider({
      authorization: `https://accounts.spotify.com/authorize?scope=${scope}`,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    }),
  ],
  debug: !isProd,
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
    async session({ session, token }) {
      // Add property to session, like an access_token from a provider.
      if (token) {
        session.accessToken = token?.accessToken;
      }
      if (!session?.image || !session?.user?.image) {
        session.user.image = null;
      }
      return session;
    },
  },
};
export default (req, res) => NextAuth(req, res, options);
