import { LOGIN, LOGOUT } from 'redux/actions/actionTypes';
import {
  clearStorage,
  getCurrentUserFromStorage,
  setCurrentUserToStorage
} from 'utils';

const initialState = {
  currentUser: getCurrentUserFromStorage(),
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      let loginState = Object.assign({}, state);
      const { currentUser } = action.payload;

      if (currentUser) {
        setCurrentUserToStorage(currentUser);
        loginState.currentUser = currentUser;
      }

      return loginState;

    case LOGOUT:
      clearStorage();
      let logOutState = {};
      return logOutState;

    default:
      return state;
  }
};

export default authReducer;
