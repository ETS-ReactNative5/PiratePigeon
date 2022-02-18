
import { USERDATA } from "../../Constant/ReduxConstant";
const data =
{
  userData: {},
};


const UserDataReducer = (state = data, action) => {

  switch (action.type) {
    case USERDATA:
      return { ...state, userData: action.payload }
    default:
      return state;

  }
};

export default UserDataReducer;