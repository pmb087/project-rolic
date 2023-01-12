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

// 구글 로그인 버튼 컴포넌트
// 로그인 된 계정의 이메일, 프로필 사진, 이름을 구글 OAuth를 통해서 응답받는다.
// Response의 정보 중 Email은 회원정보를 조회하는 id로 사용 되기에 현재 로그인 된 Email, isLoggedIn을 Recoil에 업데이트 하고
// 이후 회원 개인의 정보가 필요한 경우는 Recoil에 업데이트 한 전역상태를 참조히여 UserService.getuser(email) API를 사용하여 진행.
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
