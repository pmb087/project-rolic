import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Url } from 'url';
import StoreInfo from '@/components/StoreInfo';
import NotSelected from '@/components/NotSelected';
import Navbar from '@/components/Navbar';
import StoreService from '@/utils/service/StoreService';
import { StoreResponse } from '@/utils/types/index';
import useScript from '@/utils/hooks/useScript';
import onLoadKakaoMap from '@/utils/func/onLoadKakaoMap';
import useRedirect from '@/utils/hooks/useRedirect';

interface Props {
  storeData: StoreResponse[];
}

function Map({ storeData }: Props) {
  const [selectedId, setSelectedId] = useState(-1);
  const selectedStore = storeData[selectedId - 1];

  useRedirect('/LoggedInMap' as unknown as Url);
  useEffect(
    () => useScript('Map', () => onLoadKakaoMap(storeData, setSelectedId)),
    []
  );

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
  overflow-y: scroll;
  padding: 20px;
  min-width: 460px;
  max-width: 460px;
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
