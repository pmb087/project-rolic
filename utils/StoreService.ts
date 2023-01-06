import axios, { AxiosResponse } from 'axios';

export interface StoreResponse {
  id: number;
  thumbnail: string;
  store_name: string;
  parking_info: string;
  main_menu: string[];
  address: string;
  click_link: {
    mango: string;
    dining: string;
  };
  position: {
    lat: number;
    lng: number;
  };
}

class Store {
  async getAllStore(): Promise<AxiosResponse<StoreResponse[]>> {
    return axios.get('http://localhost:4000/store');
  }
}

export default new Store();
