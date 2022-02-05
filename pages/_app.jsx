import '../styles/globals.css'
import '../styles/loaders.css'
import { UserProvider } from '../context/userContext';



function MyApp({ Component, pageProps: {...pageProps}}) {
  return (
  <UserProvider>
        <Component {...pageProps} />
  </UserProvider>
  )
}

export default MyApp