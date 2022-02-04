import Head from 'next/head'
import Feed from '../components/Feed'
import Header from '../components/Header';
import Modal from '../components/Modal';
import Homepage from '../components/Homepage';
import {useContext, useEffect} from 'react'
import UserContext from '../context/userContext'



export default function Home() {

  const { currentUser, loginUser, loginWithAuth } = useContext(UserContext);

  useEffect(() => {
  loginWithAuth()
}, [])

  return (
    <div className="bg-grey-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Social Brain</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {currentUser ? (
      // <pre>{JSON.stringify(currentUser)}</pre>
      <Feed currentUser={currentUser}/>
      ) : (
        <Homepage  />
    )}

      {/* Feed */}
      <Modal currentUser={currentUser}/>

    </div>
  )
}
