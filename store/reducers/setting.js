import { CHANGE_NOTIFICATION_STATUS } from '../constants';

const initialState = {
    notifyStatus: false,
};

const settingReducer = (state = initialState, action) => {
    switch(action.type) {
        case CHANGE_NOTIFICATION_STATUS:
            return {
                ...state,
                notifyStatus: action.payload
            };

        default:
            return state;
    }
}

export default settingReducer;
