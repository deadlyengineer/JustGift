import { createStore, combineReducers } from 'redux';
import userReducer from './reducers/user';
import settingReducer from './reducers/setting';

const rootReducer = combineReducers({
    user: userReducer,
    setting: settingReducer,
});

const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore;
