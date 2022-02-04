import '../styles/globals.css'
import '../styles/loaders.css'
import { RecoilRoot } from 'recoil';
import { UserProvider } from '../context/userContext';



function MyApp({ Component, pageProps: {...pageProps}}) {
  return (
  <UserProvider>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
  </UserProvider>
  )
}

export default MyApp