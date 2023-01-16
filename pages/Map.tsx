import React, { useEffect, useState } from 'react';
import StoreService from '../utils/service/StoreService';
import { StoreResponse } from '../utils/types/index';
import styled from 'styled-components';
import Image from 'next/image';
import StoreInfo from '../components/StoreInfo';
import NotSelected from '../components/NotSelected';
import useScript from '../utils/hooks/useScript';
import onLoadKakaoMap from '../utils/hooks/onLoadKakaoMap';
import GoogleLogin from '../components/GoogleLogin';
import Navbar from '../components/Navbar';

interface Props {
  storeData: StoreResponse[];
}

// 해당 페이지는 비로그인으로 지도에 접근했을 경우 제공되는 페이지
// 따라서 사용자의 행동에 따른 서버 업데이트가 발생하는 경우는 없으며 그렇기에 StaticProps를 통해 빌드할 것
// 물론 그에 따라서 SWR을 사용하는 이유는 없기 때문에 캐싱하지 않음
//  ㄴ 정적 빌드 후 배포 한다면 애초에 페이지가 따로 생성되므로 캐싱할 필요가 없음.
function Map({ storeData }: Props) {
  const NEXT_PUBLIC_KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_KEY;
  const [selectedId, setSelectedId] = useState(-1);
  const selectedStore = storeData[selectedId - 1];

  useEffect(() => {
    const scriptSrc = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${NEXT_PUBLIC_KAKAO_KEY}&autoload=false`;
    useScript(scriptSrc, () => onLoadKakaoMap(storeData, setSelectedId));
  }, [storeData]);

  return (
    <MapPageContainer>
      <LeftContainer>
        <Navbar />
        <MapWrap id='map'></MapWrap>
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
  width: 1400px;
  height: 910px;
  border: 2px solid #ff904d;
`;
