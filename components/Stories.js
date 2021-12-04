import faker from 'faker'
import {Profiler, useEffect, useState} from 'react'
import Story from "./Story"
// import { useSession } from "next-auth/react"

function Stories() {
    const [suggestions, setSuggestions] = useState([])
    // const { data: session } = useSession()

    useEffect(() => {
        // Implicit return uses () explicit return uses {}
        const suggestions = [...Array(20)].map((_, i) => ({
            ...faker.helpers.contextualCard(),
            id: i,
        }))

        setSuggestions(suggestions)
    },[])


    return (
        <div className="flex space-x-2 p-6 bg-white mt-8 border border-gray-200 rounded-sm overflow-x-scroll
         scrollbar-thin scrollbar-thumb-black">

            {/* <Story img={session.user.image} username={auth.user.username} /> */}

            {suggestions.map(profile => (
                <Story key={profile.id} img={profile.avatar} username={profile.username} />
            ))}
        </div>
    )
}

export default Stories
