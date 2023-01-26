import { StoreResponse } from '../types/index';

export default function onLoadKakaoMap(
  storeResponse: StoreResponse[],
  setSelectedId: React.Dispatch<React.SetStateAction<number>>
) {
  if (storeResponse) {
    window.kakao.maps.load(() => {
      const container = document.getElementById('map') as HTMLElement;
      const options = {
        center: new kakao.maps.LatLng(37.43, 126.95),
        level: 9
      };
      const map = new window.kakao.maps.Map(container, options);
      for (var i = 0; i < storeResponse.length; i++) {
        const { id, store_name, position } = storeResponse[i];
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
}
