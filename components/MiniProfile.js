function MiniProfile() {
    return (
        <div className="flex items-center justify-between mt-14 ml-10">
            <img className="rounded-full border w-16 h-16" src="https://links.papareact.com/3ke" alt="" />
            <div className="mx-4">
                <h2 className="font-bold">Eric</h2>
                <h3 className="text-sm">Welcome to Instagram</h3>
            </div>
            <button className="text-blue-400 text-sm font-semibold">Sign Out</button>
        </div>
    )
}

export default MiniProfile
