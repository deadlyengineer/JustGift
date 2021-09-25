import { CHANGE_GUEST, CHANGE_RECIPIENT, CHANGE_USER } from '../constants';

const initialState = {
    userId: null,
    recipient: null,
    guestId: null,
};

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case CHANGE_RECIPIENT:
            return {
                ...state,
                recipient: action.payload
            };

        case CHANGE_USER:
            return {
                ...state,
                userId: action.payload
            }

        case CHANGE_GUEST:
            return {
                ...state,
                guestId: action.payload
            }

        default:
            return state;
    }
}

export default userReducer;
