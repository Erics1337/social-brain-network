import '../styles/globals.css'
import { RecoilRoot } from 'recoil';


function MyApp({ Component, pageProps: {...pageProps}}) {
  return (
  // Session Provider allows us to keep our session state throughout our application
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
  )
}

export default MyApp