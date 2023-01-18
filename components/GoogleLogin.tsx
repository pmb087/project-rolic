import React, { useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { userInfoState } from '../utils/store/index';
import useScript from '../utils/hooks/useScript';
import jwt_decode from 'jwt-decode';
import {
  GApiResponse,
  DecodedResponse,
  GoogleLoginStyle
} from '../utils/types/index';
import { useRouter } from 'next/router';
import UserService from '../utils/service/UserService';
import onLoadGoogleLogin from '../utils/hooks/onLoadGoogleLogin';
import LocalStorageService from '../utils/service/LocalStorageService';

declare global {
  interface Window {
    google: any;
  }
}

interface Props {
  option?: GoogleLoginStyle;
}

function GoogleLogin({ option }: Props) {
  const route = useRouter();
  const googleSignInButton = useRef<HTMLDivElement>(null);
  const setUserInfo = useSetRecoilState(userInfoState);

  const useCredential = (response: GApiResponse) => {
    const { email, name, picture }: DecodedResponse = jwt_decode(
      response.credential
    );
    setUserInfo({
      email: email
    });
    LocalStorageService.set('user', email);
    UserService.signUp(email, name, picture).catch((error) => {
      if (error.message === 'Insert failed, duplicate id') {
        return;
      }
    });
    route.push('/LoggedInMap');
  };

  useScript('https://accounts.google.com/gsi/client', () =>
    onLoadGoogleLogin(useCredential, googleSignInButton)
  );

  return (
    <div
      style={{
        position:
          option !== undefined
            ? option.position === undefined
              ? 'static'
              : option.position
            : 'static',
        left: option?.left,
        bottom: option?.bottom
      }}
      ref={googleSignInButton}
    ></div>
  );
}

export default React.memo(GoogleLogin);
