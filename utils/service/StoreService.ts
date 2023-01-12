import axios, { AxiosResponse } from 'axios';
import { StoreResponse } from '../types/index';

class Store {
  async getAllStore(): Promise<AxiosResponse<StoreResponse[]>> {
    return axios.get('http://localhost:4000/store');
  }
}

export default new Store();
