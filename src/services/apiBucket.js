import axios from "axios";

const { default: request } = require("utils/request")
const { default: urls } = require("values/urls")

const uploadFile = async (file) => {
  const data = new FormData()
  data.append('file', file, file.name)
  var config = {
    method: 'post',
    url: urls.BUCKET_UPLOAD_REGISTER,
    data: data
  };
  try {
    const response = await axios(config);
    if (response.status === 200) {
      return response.data
    } else return null
  } catch (e) {
    console.log(e)
    return null
  }
}


const apiBucket = { uploadFile }

export default apiBucket;