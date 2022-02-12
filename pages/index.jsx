import Head from 'next/head'
import Feed from '../components/feed/Feed'
import Navbar from '../components/Navbar';
import Homepage from '../components/landingPage/Homepage';
import {useContext, useEffect} from 'react'
import UserContext from '../context/userContext'
import { auth } from '../firebase';
import Loader from '../components/Loader';



export default function Home() {

  const { checkLoggedIn, loading } = useContext(UserContext);

  useEffect(() => {
   checkLoggedIn()
}, [])

  if (loading) return <Loader />
  return (
    <div className="bg-grey-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Social Brain Network</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      {auth.currentUser ? (
      <Feed />
      ) : (
        <Homepage  />
    )}
    </div>
  )
}
