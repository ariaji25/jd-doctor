import { LOGIN, LOGOUT } from './actionTypes';

export const loggedIn = (payload) => ({ type: LOGIN, payload: payload });
export const loggedOut = () => ({ type: LOGOUT });
