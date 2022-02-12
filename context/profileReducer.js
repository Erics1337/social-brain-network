
/* Reducer */
const ProfileReducer = (state, action) => {
	switch (action.type) {
        case "SET_POSTS_VIEW":
            return {
                ...state,
                postsView: action.payload,
            }
        case "SET_MODAL_STATE":
            return {
                ...state,
                modalState: action.payload,
            }
		default:
			return state
	}
}

export default ProfileReducer
