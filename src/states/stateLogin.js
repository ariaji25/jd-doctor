import { proxy } from 'valtio';

const stateLogin = proxy({
  email: '',
  username: '',
  password: '',
  processing: false,
  showInputOtp: false,
  successRequestRecoveryPassword: false,
  error: '',
});

export default stateLogin;
