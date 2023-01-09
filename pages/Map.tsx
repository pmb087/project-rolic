import React, { useEffect, useState } from 'react';
import StoreService from '../utils/StoreService';
import { StoreResponse } from '../utils/types/index';
import styled from 'styled-components';
import Image from 'next/image';
import StoreInfo from '../components/StoreInfo';
import NotSelected from '../components/NotSelected';

interface Props {
  storeData: StoreResponse[];
}

function Map({ storeData }: Props) {
  const NEXT_PUBLIC_KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_KEY;
  const [selectedId, setSelectedId] = useState(-1);

  const selectedStore = storeData[selectedId - 1] || undefined;

  useEffect(() => {
    const mapScript = document.createElement('script');

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${NEXT_PUBLIC_KAKAO_KEY}&autoload=false`;
    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      if (storeData) {
        window.kakao.maps.load(() => {
          const container = document.getElementById('map') as HTMLElement;
          const options = {
            center: new kakao.maps.LatLng(37.43, 126.95),
            level: 9
          };
          const map = new window.kakao.maps.Map(container, options);
          for (var i = 0; i < storeData.length; i++) {
            const { id, store_name, position } = storeData[i];
            const imageSize = new kakao.maps.Size(24, 35);
            const marker = new kakao.maps.Marker({
              map: map,
              position: new kakao.maps.LatLng(position.lat, position.lng),
              title: store_name
            });
            const infowindow = new kakao.maps.InfoWindow({
              content: `<div  
                style="
                display: flex;
                justify-content: center;
                align-items: center;
                width:150px;
                height:40px;
                background-color: #fff;
                padding: 5px;
                border: 3px solid #ff904d;
                font-size: 16px;
                font-weight: bolder;
                background-color: #fff;
                ">${store_name}</div>`
            });
            kakao.maps.event.addListener(marker, 'mouseover', function () {
              infowindow.open(map, marker);
            });
            kakao.maps.event.addListener(marker, 'mouseout', function () {
              infowindow.close();
            });
            kakao.maps.event.addListener(marker, 'click', function () {
              setSelectedId(id);
            });
          }
        });
      }
    };
    mapScript.addEventListener('load', onLoadKakaoMap);

    return () => mapScript.removeEventListener('load', onLoadKakaoMap);
  }, [storeData]);

  return (
    <MapPageContainer>
      <LeftContainer>
        <Image
          src='/ROLIC_LOGO.svg'
          alt='Rolic Logo'
          width={420}
          height={120}
          style={{ margin: '0 0 20px 0' }}
        />
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
  const res = await StoreService.getAllStore();
  const { data } = res;
  const storeData = data;

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
