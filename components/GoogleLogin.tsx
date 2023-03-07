import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';
import useScript from '../utils/hooks/useScript';
import {
  GApiResponse,
  DecodedResponse,
  GoogleLoginStyle
} from '../utils/types/index';
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

  const useCredential = (response: GApiResponse) => {
    const { email, name, picture }: DecodedResponse = jwt_decode(
      response.credential
    );

    LocalStorageService.set('user', email);
    UserService.signUp(email, name, picture).catch((error) => {
      if (error.message === 'Insert failed, duplicate id') {
        return;
      }
    });
    route.push('/LoggedInMap');
  };

  useScript('Login', () => onLoadGoogleLogin(useCredential, googleSignInButton));

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
    />
  );
}

export default React.memo(GoogleLogin);
