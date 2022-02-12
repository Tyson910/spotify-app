    async session({ session, token }) {
        session.accessToken = token?.accessToken;
      if (!session?.image || !session?.user?.image) {
        session.user.image = null;
      }
      return session;
