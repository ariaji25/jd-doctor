const { default: request } = require("utils/request")
const { default: urls } = require("values/urls")
const axios = require("axios");

const login = async (username, password) => {
  const response = await request.post(
    urls.LOGIN_URL,
    {
      username: username,
      password: password
    }
  )
  return response.data;
}

const requestResetPassword = async (email) => {
  const response = await request.post(
    urls.REQ_RESET_PWD,
    {
      username: email
    }
  )
  return response.data
}

const resetPassword = async (password, token) => {
  console.log(token)
  const newtoken = "Bearer "+ token
  console.log(newtoken)

  const response = await axios.default.post(
    urls.RESET_PASSWORD,
    {
      password: password
    },
    {
      headers: {
        Authorization: newtoken
      }
    }
  )
  return response.data
}

const apiAuth = { login, requestResetPassword, resetPassword};

export default apiAuth;