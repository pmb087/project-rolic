import React, { useEffect, useState } from 'react';
import StoreService from '../utils/service/StoreService';
import { StoreResponse, UserResponse } from '../utils/types/index';
import styled from 'styled-components';
import NotSelected from '../components/NotSelected';
import UserService from '../utils/service/UserService';
import { useRouter } from 'next/router';
import onLoadKakaoMap from '../utils/hooks/onLoadKakaoMap';
import useScript from '../utils/hooks/useScript';
import LoggedInStoreInfo from '../components/LoggedInStoreInfo';
import LocalStorageService from '../utils/service/LocalStorageService';
import Navbar from '../components/Navbar';

interface Props {
  storeResponse: StoreResponse[];
}

function LoggedInMap({ storeResponse }: Props) {
  const NEXT_PUBLIC_KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_KEY;
  const route = useRouter();
  const [selectedId, setSelectedId] = useState(-1);
  const selectedStore = storeResponse[selectedId - 1];
  const [currentUserInfo, setCurrentUserInfo] = useState<UserResponse>();

  const getUserInfo = async (currentUser: string) => {
    const userInfo = await UserService.getUser(currentUser);
    setCurrentUserInfo(userInfo.data);
  };

  useEffect(() => {
    const currentUser = LocalStorageService.get<string>('user');
    if (currentUser === null) {
      route.push('/Map');
      return;
    } else {
      getUserInfo(currentUser);
    }
  }, []);

  useEffect(() => {
    const scriptSrc = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${NEXT_PUBLIC_KAKAO_KEY}&autoload=false`;
    useScript(scriptSrc, () => onLoadKakaoMap(storeResponse, setSelectedId));
  }, [storeResponse]);

  return (
    <MapPageContainer>
      <LeftContainer>
        <Navbar currentUserInfo={currentUserInfo} />
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
