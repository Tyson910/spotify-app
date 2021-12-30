import { getProviders, signIn } from 'next-auth/react';

export default function SignIn({ providers }) {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div className="max-w-screen-lg mx-auto flex flex-col" key={provider.name}>
          <h1 className="text-center font-semibold mb-4 text-lg">
            Login to view your {provider.name} stats
          </h1>
          <button
            onClick={() => signIn(provider.id)}
            className="self-center text-center bg-green-400 p-4 uppercase rounded-full font-semibold tracking-wider transition-colors duration-200 ease-in-out hover:bg-green-500"
          >
            Login to {provider.name}
          </button>
        </div>
      ))}
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
