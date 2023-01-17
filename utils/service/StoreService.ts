import axios, { AxiosResponse } from 'axios';
import { RequestContent, StoreResponse } from '../types/index';

class Store {
  async getAllStore(): Promise<AxiosResponse<StoreResponse[]>> {
    return axios.get('http://localhost:4000/store');
  }

  async getStore(id: number): Promise<AxiosResponse<StoreResponse>> {
    return axios.get(`http://localhost:4000/store/${id}`);
  }

  request(content: RequestContent): void {
    axios.post('http://localhost:4000/requests', content);
  }

  getRequest(): Promise<AxiosResponse<RequestContent[]>> {
    return axios.get('http://localhost:4000/requests');
  }
}

export default new Store();
