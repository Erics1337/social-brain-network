import { signOut } from "firebase/auth";
import { auth } from '../../firebase';
import {useContext } from 'react'
import UserContext from "../../context/userContext";

function MiniProfile() {
    const { currentUser } = useContext(UserContext);

    return (
        <div className="flex items-center justify-between mt-14 ml-10">
            <img className="rounded-full border w-16 h-16" src={currentUser.profilePic} alt="" />
            <div className="mx-4">
                {/* ? protects code from asynchronous behavior of the signin callback */}
                <h2 className="font-bold">{currentUser.username}</h2>
                <h3 className="text-sm">Welcome to Social Brain</h3>
            </div>
            <button onClick={()=> signOut(auth).then(() => {window.location.reload()})}
                 className="text-blue-400 text-sm font-semibold cursor-pointer">Sign Out</button>
        </div>
    )
}

export default MiniProfile
