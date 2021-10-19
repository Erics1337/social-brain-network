import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: { session, ...pageProps} }) {
  return (
  // Session Provider allows us to keep our session state throughout our application
  <SessionProvider session={session}>
    <Component {...pageProps} />
  </SessionProvider>
  )
}

export default MyApp
