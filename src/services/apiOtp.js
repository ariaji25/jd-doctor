import axios from 'axios';
import { loggedOut } from 'redux/actions/authAction';
import { getTokenFromStorage } from 'utils';
import urls from 'values/urls';

const request = async (phone) => {
  const req = await axios.post(
    urls.OTP_REQUEST,
    { phone },
  );
  return req.data;
};

const check = async (phone, secret) => {
  const req = await axios.post(
    urls.OTP_CHECK,
    { phone, secret },
  );

  return req.data;
};

const requestNRM = async (phone) => {
  const req = await axios.post(
    urls.REQUEST_NRM,
    { phone },
    {
      headers: {
        Authorization: getTokenFromStorage(),
      }
    }
  );

  return req.data;
};

const loggedOuts = () => {
  window.location = "/";
  window.store.dispatch(loggedOut());

};

const apiOtp = { request, check, requestNRM, loggedOuts };

export default apiOtp;
