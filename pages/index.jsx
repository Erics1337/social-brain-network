import Head from 'next/head'
import Feed from '../components/loggedIn/feed/Feed'
import Navbar from '../components/Navbar';
import Modal from '../components/Modal';
import Homepage from '../components/landingPage/Homepage';
import {useContext, useEffect} from 'react'
import UserContext from '../context/userContext'
import { auth } from '../firebase';



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

      <Navbar />

      {auth ? (
      <Feed />
      ) : (
        <Homepage  />
    )}

      {/* Feed */}
      <Modal currentUser={currentUser}/>

    </div>
  )
}
