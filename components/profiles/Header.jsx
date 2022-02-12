import Image from 'next/image'

function Header({ userData }) {
  return (
      <>
    <header className="flex flex-wrap items-center p-4 md:py-8">

    <div className="md:w-3/12 md:ml-16">
      {/* <!-- profile image --> */}
      <Image height={120} width={120} className="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full
                   border-2 border-pink-600 p-1" 
                   alt="profile" 
                   src={userData.profilePic}
                   />
    </div>

    {/* <!-- profile meta --> */}
    <div className="w-8/12 md:w-7/12 ml-4">
      <div className="md:flex md:flex-wrap md:items-center mb-4">
        <h2 className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
          mrtravlerrr_
        </h2>

        {/* <!-- badge --> */}
        <span className="inline-block fas fa-certificate fa-lg text-blue-500 
                             relative mr-6 text-xl transform -translate-y-2" aria-hidden="true">
          <i className="fas fa-check text-white text-xs absolute inset-x-0
                             ml-1 mt-px"></i>
        </span>

        {/* <!-- follow button --> */}
        <a href="#" className="bg-blue-500 px-2 py-1 
                      text-white font-semibold text-sm rounded block text-center 
                      sm:inline-block block">Follow</a>
      </div>

      {/* <!-- post, following, followers list for medium screens --> */}
      <ul className="hidden md:flex space-x-8 mb-4">
        <li>
          <span className="font-semibold">136</span>
          posts
        </li>

        <li>
          <span className="font-semibold">40.5k</span>
          followers
        </li>
        <li>
          <span className="font-semibold">302</span>
          following
        </li>
      </ul>

      {/* <!-- user meta form medium screens --> */}
      <div className="hidden md:block">
        <h1 className="font-semibold">Mr Travlerrr...</h1>
        <span>Travel, Nature and Music</span>
        <p>Lorem ipsum dolor sit amet consectetur</p>
      </div>

    </div>

    {/* <!-- user meta form small screens --> */}
    <div className="md:hidden text-sm my-2">
      <h1 className="font-semibold">Mr Travlerrr...</h1>
      <span>Travel, Nature and Music</span>
      <p>Lorem ipsum dolor sit amet consectetur</p>
    </div>

  </header>
        {/* <!-- user following for mobile only --> */}
        <ul className="flex md:hidden justify-around space-x-8 border-t 
        text-center p-2 text-gray-600 leading-snug text-sm">
<li>
  <span className="font-semibold text-gray-800 block">136</span>
  posts
</li>

<li>
  <span className="font-semibold text-gray-800 block">40.5k</span>
  followers
</li>
<li>
  <span className="font-semibold text-gray-800 block">302</span>
  following
</li>
</ul>
</>
  )
}

export default Header