import { getProviders, signIn } from "next-auth/react"
import Header from "../../components/Header";

// Browser
function signin({ providers }) {
    return (
        <>
        <Header />
        <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-56 px-14 text-center">
          <img src="https://links.papareact.com/ocw" 
            className="w-80" alt="" /> 

          <div className="mt-14">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button onClick={() => signIn(provider.id, { callbackUrl: NEXTAUTH_URL })}
              className="p-3 bg-blue-500 rounded-lg text-white">
                Sign in with {provider.name}
              </button>
            </div>
          ))}
          </div>
        </div>
      </>
    )
}

// added NEXTAUTH_URL

// Server side render
export async function getServerSideProps() {
    const providers = await getProviders()

    return {
        props: {
            providers
        }
    }
}

export default signin
