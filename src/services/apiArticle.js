import axios from 'axios';
import config from 'utils/config';

export default class ArticleServices {
  getAll = (
    opts = { page: 1, limit: 10 },
    search = '',
    tag = ''
  ) => {
    return new Promise((resolve, reject) => {
      axios
        .get(config.apiURL + "/api/articles", {
          params: {
            ...opts,
            search,
            tag
          }
        })
        .then((res) => {
          resolve(res.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  getOne = (id) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${config.apiURL}/api/article/${id}`)
        .then((res) => {
          resolve(res.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  geTopFiveTags = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(config.apiURL + "/api/article/tags")
        .then((res) => {
          resolve(res.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
}