// Reducer

const ChatReducer = (state, action) => {
    switch (action.type) {
        case "SET_CURRENT_CHAT":
            console.log("SET_CURRENT_CHAT", action.payload)
            return {
                ...state,
                currentChat: action.payload,
            }
        default:
            return state
    }
}

export default ChatReducer