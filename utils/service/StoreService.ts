import { AxiosResponse } from 'axios';
import client from './CustomAxios';
import {
  AddStoreBody,
  RequestContent,
  RequestGetContent,
  StoreResponse
} from '../types/index';

class Store {
  getAllStore(): Promise<AxiosResponse<StoreResponse[]>> {
    return client.get('/store');
  }

  getStore(id: number): Promise<AxiosResponse<StoreResponse>> {
    return client.get(`/store/${id}`);
  }

  request(content: RequestContent): void {
    client.post('/requests', content);
  }

  getRequest(): Promise<AxiosResponse<RequestGetContent[]>> {
    return client.get('/requests');
  }

  deleteRequest(id: number): void {
    client.delete(`/requests/${id}`);
  }

  addStore(content: AddStoreBody): void {
    client.post('/store', content);
  }
}

export default new Store();
