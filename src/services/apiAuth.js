const { default: request } = require("utils/request")
const { default: urls } = require("values/urls")

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

const apiAuth = {login};

export default apiAuth;