import axios, {AxiosInstance} from 'axios';

const apiManager: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_SERVER}`,
  timeout: 3000,
});

export default apiManager;
