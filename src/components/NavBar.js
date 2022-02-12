import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { UserCircleIcon } from '@heroicons/react/outline';

export function NavBar() {
  const { data: session } = useSession();

  if (!session) {
    return <></>;
  }
  return (
    <div className="mb-10 bg-slate-50 border-b border-slate-50 shadow-sm sticky z-10 opacity-95 w-full top-0">
      <nav className="flex container justify-around items-center">
        <Link href={'/'}>
          <a>Home</a>
        </Link>
        <div className="flex py-3 gap-x-5">
          <UserCircleIcon className="w-10 h-10 " />
          <div className="text-center ">
            <p>Signed in as {session?.user?.name}</p>
            <button onClick={() => signOut()} className="hover:underline">
              Sign out
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
