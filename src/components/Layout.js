import { NavBar } from './NavBar';
import { useSession } from 'next-auth/react';
import { Login } from './Login';

export function Layout({ children }) {
  const { data: session } = useSession();
  if (!session) {
    return <Login />;
  }
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  );
}
