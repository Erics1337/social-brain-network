import Stories from "./Stories"
import Posts from "./Posts"
import MiniProfile from "./MiniProfile"
import Suggestions from "./Suggestions"


function Feed({ currentUser }) {

  return (
    <main className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3xl xl:grid-cols-3 
                xl:max-w-6xl mx-auto max-w-3xl`}
    >
      <section className="col-span-2">
        <Stories />
        <Posts />
        <h1>{currentUser.username}</h1>
      </section>
      <section className="hidden xl:inline-grid md:col-span-1">
        <div className="fixed top-20">
          <MiniProfile currentUser={currentUser}/>
          <Suggestions />
        </div>
      </section>
    </main>
  )
}

export default Feed
