const initialState = {
    userDetails: {}
}

export default userDetailReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'USER DETAILS' : {
            return {
                ...state,
                userDetails: action.payload
            }
        }
        default: 
        return state;
    };
};