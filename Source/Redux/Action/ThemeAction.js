import { THEME } from "../../Constant/ReduxConstant";

const ThemeAction = (value) => (dispatch) => {
    dispatch({ type: THEME, payload: value })
}

export default ThemeAction;