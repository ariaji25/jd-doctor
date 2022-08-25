import { proxy } from 'valtio';

const stateLogin = proxy({
  nohp: '',
  processing: false,
  showInputOtp: false,
  error: '',
});

export default stateLogin;
