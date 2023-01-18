import { useState } from 'react';
import styled from 'styled-components';
import StoreService from '../utils/service/StoreService';
import { AddStoreBody } from '../utils/types';

// - 망고,다이닝 링크 없을 경우 흑백처리, 클릭불가
// - 좌상단 로고 클릭시 지도로 이동

// - 전체적인 리팩토링
// - 배포

function AddStore() {
  const [storeMenu, setStoreMenu] = useState<string[]>([]);
  const [menuString, setMenuString] = useState('');
  const [addStoreData, setAddStoreData] = useState({
    thumbnail: '',
    storeName: '',
    parkingInfo: '',
    address: '',
    mango: '',
    dining: '',
    lat: '',
    lng: ''
  });

  const handleMenuString = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setMenuString(value);
  };

  const addStoreMenu = () => {
    setStoreMenu([...storeMenu, menuString]);
    setMenuString('');
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAddStoreData({ ...addStoreData, [`${name}`]: value });
  };

  const deleteMenu = (id: number) => {
    setStoreMenu([...storeMenu.filter((_, index) => index !== id)]);
  };

  const addStoreToMap = () => {
    const {
      thumbnail,
      storeName,
      parkingInfo,
      address,
      mango,
      dining,
      lat,
      lng
    } = addStoreData;
    const content: AddStoreBody = {
      thumbnail: thumbnail,
      store_name: storeName,
      parking_info: parkingInfo,
      main_menu: storeMenu,
      address: address,
      click_link: {
        mango: mango,
        dining: dining
      },
      position: {
        lat: Number(lat),
        lng: Number(lng)
      }
    };
    StoreService.addStore(content);
    setAddStoreData({
      thumbnail: '',
      storeName: '',
      parkingInfo: '',
      address: '',
      mango: '',
      dining: '',
      lat: '',
      lng: ''
    });
    setMenuString('');
    setStoreMenu([]);
    alert('지도에 가게가 추가되었습니다.');
  };

  return (
    <AddStoreContainer>
      <AddStoreHeader>가게 추가</AddStoreHeader>
      <AddStoreInputContainer>
        <AddStoreInputTitle>가게 이름</AddStoreInputTitle>
        <AddStoreInputSource
          value={addStoreData.storeName}
          name='storeName'
          onChange={handleInput}
        />
      </AddStoreInputContainer>
      <AddStoreInputContainer>
        <AddStoreInputTitle>음식 사진 주소</AddStoreInputTitle>
        <AddStoreInputSource
          value={addStoreData.thumbnail}
          name='thumbnail'
          onChange={handleInput}
        />
      </AddStoreInputContainer>
      <AddStoreInputContainer>
        <AddStoreInputTitle>주차 정보</AddStoreInputTitle>
        <AddStoreInputSource
          value={addStoreData.parkingInfo}
          name='parkingInfo'
          onChange={handleInput}
        />
      </AddStoreInputContainer>
      <AddStoreInputContainer>
        <AddStoreInputTitle>가게 주소</AddStoreInputTitle>
        <AddStoreInputSource
          value={addStoreData.address}
          name='address'
          onChange={handleInput}
        />
      </AddStoreInputContainer>
      <AddStoreInputContainer>
        <AddStoreInputTitle>메뉴 추가</AddStoreInputTitle>
        <CurrentMenuContainer>
          {storeMenu.map((el, index) => {
            return (
              <MenuBlockContainer>
                <MenuText>{el}</MenuText>
                <MenuDelete onClick={() => deleteMenu(index)}>X</MenuDelete>
              </MenuBlockContainer>
            );
          })}
        </CurrentMenuContainer>
        <AddMenuContainer>
          <AddStoreInputSource
            style={{ width: '260px' }}
            value={menuString}
            onChange={handleMenuString}
          />
          <AddMenu onClick={addStoreMenu}>추가</AddMenu>
        </AddMenuContainer>
      </AddStoreInputContainer>
      <AddStoreInputContainer>
        <AddStoreInputTitle>망고플레이트 링크</AddStoreInputTitle>
        <AddStoreInputSource
          value={addStoreData.mango}
          name='mango'
          onChange={handleInput}
        />
      </AddStoreInputContainer>
      <AddStoreInputContainer>
        <AddStoreInputTitle>다이닝코드 링크</AddStoreInputTitle>
        <AddStoreInputSource
          value={addStoreData.dining}
          name='dining'
          onChange={handleInput}
        />
      </AddStoreInputContainer>
      <AddStoreInputContainer>
        <AddStoreInputTitle>위도, 경도</AddStoreInputTitle>
        <div style={{ display: 'flex' }}>
          <AddStoreInputPositionSource
            placeholder='lat'
            value={addStoreData.lat}
            name='lat'
            onChange={handleInput}
          />
          <AddStoreInputPositionSource
            placeholder='lng'
            value={addStoreData.lng}
            name='lng'
            onChange={handleInput}
          />
        </div>
      </AddStoreInputContainer>
      <PostStoreDataButton onClick={addStoreToMap}>
        가게 추가하기
      </PostStoreDataButton>
    </AddStoreContainer>
  );
}

export default AddStore;

const AddStoreContainer = styled.div`
  width: 100%;
  margin: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const AddStoreHeader = styled.div`
  padding: 20px 20px 20px 50px;
  width: 100%;
  font-size: 30px;
  font-weight: bolder;
  color: #505050;
  border-bottom: 2px solid #808080;
`;

const AddStoreInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  border-bottom: 1px solid #ff904d;
`;

const AddStoreInputTitle = styled.p`
  font-size: 24px;
  font-weight: 600;
`;

const AddStoreInputSource = styled.input`
  margin: 20px 0;
  padding: 10px;
  width: 600px;
  font-size: 18px;
  font-weight: 600;
  border: 2px solid #ff904d;
  border-radius: 5px;
  outline: none;
`;

const AddStoreInputPositionSource = styled(AddStoreInputSource)`
  width: 290px;
  margin-right: 20px;
`;

const AddMenu = styled.button`
  width: 80px;
  height: 45px;
  margin-left: 20px;
  border: 2px solid #ff904d;
  background-color: #fff;
  color: #ff904d;
  font-size: 18px;
  font-weight: 600;
  outline: none;
  border-radius: 5px;
  :hover {
    background-color: #ff904d;
    color: #fff;
    cursor: pointer;
  }
`;

const AddMenuContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CurrentMenuContainer = styled.div`
  display: flex;
`;

const MenuBlockContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 6px 0px;
  padding: 10px 5px;
  background-color: #ff904d;
  border-radius: 5px;
  color: #fff;
`;
const MenuText = styled.p`
  font-size: 20px;
`;
const MenuDelete = styled.button`
  margin-left: 10px;
  border: none;
  outline: none;
  color: #fff;
  font-size: 16px;
  font-weight: bolder;
  background-color: #ff904d;
  border-radius: 10px;

  :hover {
    cursor: pointer;
    background-color: #fff;
    color: #ff904d;
  }
`;

const PostStoreDataButton = styled.button`
  width: 160px;
  height: 80px;
  margin-left: 10px;
  border: none;
  outline: none;
  color: #fff;
  font-size: 24px;
  font-weight: bolder;
  background-color: #ff904d;
  border: 3px solid #ff904d;
  border-radius: 10px;
  align-self: flex-end;

  :hover {
    cursor: pointer;
    background-color: #fff;
    color: #ff904d;
  }
`;
