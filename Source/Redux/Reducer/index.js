import { combineReducers } from 'redux';
import ThemeReducer from "./ThemeReducer";

const reducers = combineReducers({
    theme:ThemeReducer,
});

export default reducers;