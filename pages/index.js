import Head from 'next/head'
import Feed from '../components/Feed'
import Header from '../components/Header';
import Modal from '../components/Modal';
import Homepage from '../components/Homepage';
import { useSession } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="bg-grey-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Social Brain</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {session ? (
      <Feed />
      ) : (
        <Homepage  />
    )}

      {/* Feed */}
      <Modal />

    </div>
  )
}
