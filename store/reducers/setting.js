import { CHANGE_NOTIFICATION_STATUS, CHECK_FIRST_RUNNIG } from '../constants';

const initialState = {
    notifyStatus: false,
    isFirstRun: true,
};

const settingReducer = (state = initialState, action) => {
    switch(action.type) {
        case CHANGE_NOTIFICATION_STATUS:
            return {
                ...state,
                notifyStatus: action.payload
            };

        case CHECK_FIRST_RUNNIG:
            return {
                ...state,
                isFirstRun: action.payload
            }

        default:
            return state;
    }
}

export default settingReducer;
