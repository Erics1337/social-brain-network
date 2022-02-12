
/* Reducer */
const ProfileReducer = (state, action) => {
	switch (action.type) {
        case "SET_POSTS_VIEW":
            return {
                ...state,
                postsView: action.payload,
            }
		default:
			return state
	}
}

export default ProfileReducer
