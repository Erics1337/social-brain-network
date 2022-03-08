import '../styles/globals.css'
import '../styles/loaders.css'
import { UserProvider } from '../context/userContext';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { ChatProvider } from '../context/chatContext';


function MyApp({ Component, pageProps: {...pageProps}}) {
  return (
    <DndProvider backend={HTML5Backend}>
      <ChatProvider >
        <UserProvider>
              <Component {...pageProps} />
        </UserProvider>
      </ChatProvider>
    </DndProvider>
  )
}

export default MyApp