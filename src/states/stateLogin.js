import { proxy } from 'valtio';

const stateLogin = proxy({
  username: '',
  password: '',
  processing: false,
  showInputOtp: false,
  error: '',
});

export default stateLogin;
