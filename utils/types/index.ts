export interface GApiResponse {
  credential: string;
}

export interface DecodedResponse {
  exp: number;
  email: string;
  name: string;
  picture: string;
}

export interface CurrentUser {
  email: string;
}

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

export interface UserResponse {
  id: string;
  name: string;
  picture_uri: string;
  like_store: number[];
}

type Position = 'static' | 'relative' | 'absolute' | 'sticky' | 'fixed';
export interface GoogleLoginStyle {
  position: Position | undefined;
  left: string | undefined;
  bottom: string | undefined;
}

export interface RequestContent {
  storeName: string;
  requestReason: string;
  postTime: string;
}
