import React, { useEffect, useState } from 'react';
import StoreService from '../utils/StoreService';
import { StoreResponse, UserResponse } from '../utils/types/index';
import styled from 'styled-components';
import Image from 'next/image';
import StoreInfo from '../components/StoreInfo';
import NotSelected from '../components/NotSelected';
import UserService from '../utils/UserService';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../utils/store';
import { useRouter } from 'next/router';
import onLoadKakaoMap from '../utils/hooks/onLoadKakaoMap';
import useScript from '../utils/hooks/useScript';
import LoggedInStoreInfo from '../components/LoggedInStoreInfo';
import UserInfo from '../components/UserInfo';

interface Props {
  storeResponse: StoreResponse[];
}
// Todo
// - 찜 한 가게의 맵 마커 다르게 표시
//
// 이후에 할 일
// - 마이 페이지 만들고 찜 한 가게 몰아보기
// - 모든 계정들이 좋아요 한 가게의 통계 페이지
// - 가게 추가 건의 페이지 (유저)
// - 가게 추가 페이지 (관리자가 웹에서 처리할 수 있게)

function LoggedInMap({ storeResponse }: Props) {
  const NEXT_PUBLIC_KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_KEY;
  const route = useRouter();
  const { email, isLoggedIn } = useRecoilValue(userInfoState);
  const [selectedId, setSelectedId] = useState(-1);
  const selectedStore = storeResponse[selectedId - 1];
  const [currentUserInfo, setCurrentUserInfo] = useState<UserResponse>();

  const getUserInfo = async () => {
    if (!isLoggedIn) return;
    const userInfo = await UserService.getUser(email);
    setCurrentUserInfo(userInfo.data);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      route.push('/Map');
      return;
    }
    getUserInfo();
  }, []);

  useEffect(() => {
    const scriptSrc = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${NEXT_PUBLIC_KAKAO_KEY}&autoload=false`;
    useScript(scriptSrc, () => onLoadKakaoMap(storeResponse, setSelectedId));
  }, [storeResponse]);

  return (
    <MapPageContainer>
      <LeftContainer>
        <LeftContainerHeader>
          <Image
            src='/ROLIC_LOGO.svg'
            alt='Rolic Logo'
            width={420}
            height={120}
            style={{ margin: '0 0 20px 0' }}
          />
          {currentUserInfo !== undefined && (
            <UserInfo
              name={currentUserInfo.name}
              picture={currentUserInfo.picture_uri}
            />
          )}
        </LeftContainerHeader>
        <MapWrap id='map'></MapWrap>
      </LeftContainer>
      <RightContainer>
        {selectedStore === undefined ? (
          <NotSelected />
        ) : (
          currentUserInfo !== undefined && (
            <LoggedInStoreInfo
              store={selectedStore}
              userInfo={currentUserInfo}
              selectedId={selectedId}
            />
          )
        )}
      </RightContainer>
    </MapPageContainer>
  );
}

export default LoggedInMap;

export async function getServerSideProps() {
  const storeRes = await StoreService.getAllStore();
  const storeResponse = storeRes.data;

  return {
    props: {
      storeResponse
    }
  };
}

const MapPageContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LeftContainer = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  height: 100vh;
`;

const RightContainer = styled.aside`
  padding: 20px;
  box-shadow: 0 0 3px 3px #c0c0c0;
  border-radius: 5px 0 0 5px;
  max-width: 460px;
  min-width: 460px;
  max-height: 100vh;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    height: 30%;
    background: #ff904d;

    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2); /*스크롤바 뒷 배경 색상*/
  }
`;

const MapWrap = styled.div`
  width: 1400px;
  height: 910px;
  border: 2px solid #ff904d;
`;

const LeftContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
