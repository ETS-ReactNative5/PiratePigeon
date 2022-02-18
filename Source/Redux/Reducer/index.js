import { combineReducers } from 'redux';
import ThemeReducer from "./ThemeReducer";
import UserDataReducer from "./UserDataReducer";

const reducers = combineReducers({
    theme:ThemeReducer,
    UserDataReducer:UserDataReducer,
});

export default reducers;