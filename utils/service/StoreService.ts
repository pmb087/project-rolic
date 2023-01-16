import axios, { AxiosResponse } from 'axios';
import { RequestContent, StoreResponse } from '../types/index';

class Store {
  async getAllStore(): Promise<AxiosResponse<StoreResponse[]>> {
    return axios.get('http://localhost:4000/store');
  }

  request(content: RequestContent): void {
    axios.post('http://localhost:4000/requests', content);
  }
}

export default new Store();
