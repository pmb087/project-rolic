import { atom } from 'recoil';
import { CurrentUser } from '../types';

export const userInfoState = atom<CurrentUser>({
  key: 'userInfoState',
  default: {
    email: '',
    expiredTime: 0,
    isLoggedIn: false
  }
});
