import axios, { AxiosResponse } from 'axios';
import {
  AddStoreBody,
  RequestContent,
  RequestGetContent,
  StoreResponse
} from '../types/index';

class Store {
  getAllStore(): Promise<AxiosResponse<StoreResponse[]>> {
    return axios.get('https://project-rolic-json-server.herokuapp.com/store');
  }

  getStore(id: number): Promise<AxiosResponse<StoreResponse>> {
    return axios.get(
      `https://project-rolic-json-server.herokuapp.com/store/${id}`
    );
  }

  request(content: RequestContent): void {
    axios.post(
      'https://project-rolic-json-server.herokuapp.com/requests',
      content
    );
  }

  getRequest(): Promise<AxiosResponse<RequestGetContent[]>> {
    return axios.get(
      'https://project-rolic-json-server.herokuapp.com/requests'
    );
  }

  deleteRequest(id: number): void {
    axios.delete(
      `https://project-rolic-json-server.herokuapp.com/requests/${id}`
    );
  }

  addStore(content: AddStoreBody): void {
    axios.post(
      'https://project-rolic-json-server.herokuapp.com/store',
      content
    );
  }
}

export default new Store();
