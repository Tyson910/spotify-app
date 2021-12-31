import { useSession, signIn, signOut } from "next-auth/react"

export function Login() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session?.user?.name}, email: {session?.user?.email} <br />
        <button onClick={() => signOut()} className="spotify-btn">Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn("spotify")} className="spotify-btn">Sign in</button>
    </>
  )
}