
import { THEME } from "../../Constant/ReduxConstant";
const data =
{
  theme: "light",
};


const ThemeReducer = (state = data, action) => {

  switch (action.type) {
    case THEME:
      return { ...state, theme: action.payload }
    default:
      return state;

  }
};

export default ThemeReducer;