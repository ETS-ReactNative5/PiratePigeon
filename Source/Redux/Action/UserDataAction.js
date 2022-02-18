import { USERDATA } from "../../Constant/ReduxConstant";

const UserDataAction = (value) => (dispatch) => {
    dispatch({ type: USERDATA, payload: value })
}

export default UserDataAction;