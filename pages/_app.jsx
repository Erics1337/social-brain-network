import '../styles/globals.css'
import '../styles/loaders.css'
import { UserProvider } from '../context/userContext';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


function MyApp({ Component, pageProps: {...pageProps}}) {
  return (
    <DndProvider backend={HTML5Backend}>
      <UserProvider>
            <Component {...pageProps} />
      </UserProvider>
    </DndProvider>
  )
}

export default MyApp