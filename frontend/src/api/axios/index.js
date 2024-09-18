import axios from 'axios';
import LocalStorageService from '../../service/localStorage';

axios.interceptors.request.use(
  function (config) {
    const token = LocalStorageService.getTokenDetails();
    config['headers']['Authorization'] = 'Bearer ' + token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axios;
