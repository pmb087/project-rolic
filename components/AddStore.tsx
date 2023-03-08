import React, { useState } from 'react';
import styled from 'styled-components';
import StoreService from 'utils/service/StoreService';
import { AddStoreBody } from 'utils/types';

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
  const addStoreButtonDisabled = !(
    addStoreData.thumbnail !== '' &&
    addStoreData.storeName !== '' &&
    addStoreData.parkingInfo !== '' &&
    addStoreData.address !== '' &&
    addStoreData.mango !== '' &&
    addStoreData.dining !== '' &&
    addStoreData.lat !== '' &&
    addStoreData.lng !== '' &&
    storeMenu.length !== 0
  );

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
    const content: AddStoreBody = {
      thumbnail: addStoreData.thumbnail,
      store_name: addStoreData.storeName,
      parking_info: addStoreData.parkingInfo,
      main_menu: storeMenu,
      address: addStoreData.address,
      click_link: {
        mango: addStoreData.mango,
        dining: addStoreData.dining
      },
      position: {
        lat: Number(addStoreData.lat),
        lng: Number(addStoreData.lng)
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
      <PostStoreDataButton
        onClick={addStoreToMap}
        disabled={addStoreButtonDisabled}
      >
        가게 추가하기
      </PostStoreDataButton>
    </AddStoreContainer>
  );
}

export default AddStore;

const AddStoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  padding: 20px;
  width: 100%;
`;

const AddStoreHeader = styled.div`
  padding: 20px 20px 20px 50px;
  width: 100%;
  border-bottom: 2px solid ${(props) => props.theme.normalGray};
  color: ${(props) => props.theme.darkGray};
  font-size: 30px;
  font-weight: bolder;
`;

const AddStoreInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  border-bottom: 1px solid ${(props) => props.theme.mangoOrange};
`;

const AddStoreInputTitle = styled.p`
  font-size: 24px;
  font-weight: 600;
`;

const AddStoreInputSource = styled.input`
  margin: 20px 0;
  padding: 10px;
  width: 600px;
  border: 2px solid ${(props) => props.theme.mangoOrange};
  border-radius: 5px;
  outline: none;
  font-size: 18px;
  font-weight: 600;
`;

const AddStoreInputPositionSource = styled(AddStoreInputSource)`
  margin-right: 20px;
  width: 290px;
`;

const AddMenu = styled.button`
  margin-left: 20px;
  border: 2px solid ${(props) => props.theme.mangoOrange};
  width: 80px;
  height: 45px;
  background-color: #fff;
  border-radius: 5px;
  outline: none;
  color: ${(props) => props.theme.mangoOrange};
  font-size: 18px;
  font-weight: 600;
  :hover {
    background-color: ${(props) => props.theme.mangoOrange};
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
  background-color: ${(props) => props.theme.mangoOrange};
  border-radius: 5px;
  color: #fff;
`;
const MenuText = styled.p`
  font-size: 20px;
`;
const MenuDelete = styled.button`
  margin-left: 10px;
  background-color: ${(props) => props.theme.mangoOrange};
  border: none;
  border-radius: 10px;
  outline: none;
  color: #fff;
  font-size: 16px;
  font-weight: bolder;

  :hover {
    background-color: #fff;
    color: ${(props) => props.theme.mangoOrange};
    cursor: pointer;
  }
`;

const PostStoreDataButton = styled.button`
  align-self: flex-end;
  margin-left: 10px;
  width: 160px;
  height: 80px;
  background-color: ${(props) => props.theme.mangoOrange};
  border: 3px solid ${(props) => props.theme.mangoOrange};
  border-radius: 10px;
  outline: none;
  color: #fff;
  font-size: 24px;
  font-weight: bolder;

  :hover {
    background-color: #fff;
    color: ${(props) => props.theme.mangoOrange};
    cursor: pointer;
  }

  :disabled {
    opacity: 0.5;
    cursor: default;
  }
`;
