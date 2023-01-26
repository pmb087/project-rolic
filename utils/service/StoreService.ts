import axios, { AxiosResponse } from 'axios';
import {
  AddStoreBody,
  RequestContent,
  RequestGetContent,
  StoreResponse
} from '../types/index';

class Store {
  getAllStore(): Promise<AxiosResponse<StoreResponse[]>> {
    return axios.get('http://localhost:4000/store');
  }

  getStore(id: number): Promise<AxiosResponse<StoreResponse>> {
    return axios.get(`http://localhost:4000/store/${id}`);
  }

  request(content: RequestContent): void {
    axios.post('http://localhost:4000/requests', content);
  }

  getRequest(): Promise<AxiosResponse<RequestGetContent[]>> {
    return axios.get('http://localhost:4000/requests');
  }

  deleteRequest(id: number): void {
    axios.delete(`http://localhost:4000/requests/${id}`);
  }

  addStore(content: AddStoreBody): void {
    axios.post('http://localhost:4000/store', content);
  }
}

export default new Store();
