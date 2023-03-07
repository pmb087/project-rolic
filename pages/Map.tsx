import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Url } from 'url';
import StoreService from '../utils/service/StoreService';
import { StoreResponse } from '../utils/types/index';
import StoreInfo from '../components/StoreInfo';
import NotSelected from '../components/NotSelected';
import useScript from '../utils/hooks/useScript';
import onLoadKakaoMap from '../utils/hooks/onLoadKakaoMap';
import Navbar from '../components/Navbar';
import useRedirect from '../utils/hooks/useRedirect';

interface Props {
  storeData: StoreResponse[];
}

function Map({ storeData }: Props) {
  const [selectedId, setSelectedId] = useState(-1);
  const selectedStore = storeData[selectedId - 1];

  useRedirect("/LoggedInMap" as unknown as Url);
  useEffect(() => useScript('Map', () => onLoadKakaoMap(storeData, setSelectedId)), [storeData]);

  return (
    <MapPageContainer>
      <LeftContainer>
        <Navbar isAdmin={false} />
        <MapWrap id='map' />
      </LeftContainer>
      <RightContainer>
        {selectedStore === undefined ? (
          <NotSelected />
        ) : (
          <StoreInfo store={selectedStore} />
        )}
      </RightContainer>
    </MapPageContainer>
  );
}

export default Map;

export async function getStaticProps() {
  const storeData = await StoreService.getAllStore().then((res) => res.data);

  return {
    props: {
      storeData
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
  width: 940px;
  height: 910px;
  border: 2px solid #ff904d;
`;
