
   
/* Actions */

export const setCurrentUser = (payload) => {
    return {
        type: "SET_CURRENT_USER",
        payload
    };
};
export const setLoading = (loading) => {
    return {
        type: "LOADING",
        loading
    };
};


/* Reducer */

const UserReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return {
                ...state,
                loading: true,
            };
        case "SET_CURRENT_USER":
            console.log('logging in user from reducer', action.payload);
            return {
                ...state,
                currentUser: action.payload,
                loading: false,
            };
        default:
            return state;
    }
}

export default UserReducer