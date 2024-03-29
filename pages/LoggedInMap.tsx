import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Url } from 'url';
import NotSelected from '@/components/NotSelected';
import LoggedInStoreInfo from '@/components/LoggedInStoreInfo';
import Navbar from '@/components/Navbar';
import StoreService from '@/utils/service/StoreService';
import { StoreResponse } from '@/utils/types/index';
import onLoadKakaoMap from '@/utils/func/onLoadKakaoMap';
import useScript from '@/utils/hooks/useScript';
import useRedirect from '@/utils/hooks/useRedirect';
import useGetUser from '@/utils/hooks/useGetUser';

interface Props {
  storeResponse: StoreResponse[];
}

function LoggedInMap({ storeResponse }: Props) {
  const [selectedId, setSelectedId] = useState(-1);
  const selectedStore = storeResponse[selectedId - 1];
  const { isAdmin, currentUserInfo, getUserInfo } = useGetUser(false);

  useRedirect('/Map' as unknown as Url, getUserInfo);
  useEffect(
    () => useScript('Map', () => onLoadKakaoMap(storeResponse, setSelectedId)),
    [storeResponse]
  );

  return (
    <MapPageContainer>
      <LeftContainer>
        <Navbar isAdmin={isAdmin} currentUserInfo={currentUserInfo} />
        <MapWrap id='map' />
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
  overflow-y: scroll;
  padding: 20px;
  max-width: 460px;
  min-width: 460px;
  max-height: 100vh;
  border-radius: 5px 0 0 5px;
  box-shadow: 0 0 3px 3px ${(props) => props.theme.lightGray};

  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    height: 30%;
    background: ${(props) => props.theme.mangoOrange};
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2); /*스크롤바 뒷 배경 색상*/
  }
`;

const MapWrap = styled.div`
  width: 940px;
  height: 910px;
  border: 2px solid ${(props) => props.theme.mangoOrange};
`;
