import '../styles/globals.css'
import { RecoilRoot } from 'recoil';
import { UserProvider } from '../context/UserContext';



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