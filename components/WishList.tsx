import Image from 'next/image';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import LocalStorageService from '../utils/service/LocalStorageService';
import UserService from '../utils/service/UserService';
import { StoreResponse, UserResponse } from '../utils/types';
import WishStore from './WishStore';

interface Props {
  storeResponse: StoreResponse[];
}

function WishList({ storeResponse }: Props) {
  const [currentUserInfo, setCurrentUserInfo] = useState<UserResponse>();
  const filterdStore = storeResponse.filter((el) =>
    currentUserInfo?.like_store.includes(el.id)
  );

  const getUserInfo = async (currentUser: string) => {
    const userInfo = await UserService.getUser(currentUser);
    setCurrentUserInfo(userInfo.data);
  };

  useEffect(() => {
    const currentUser = LocalStorageService.get<string>('user');
    if (currentUser !== null) getUserInfo(currentUser);
  }, []);

  return (
    <WishListContainer>
      <WishListHeader>
        <WishListHeaderText>찜 목록</WishListHeaderText>
      </WishListHeader>
      <WishStoreContainer>
        {filterdStore.length < 1 ? (
          <Image
            src='/noWishList.svg'
            alt='찜한 가게가 없음'
            width={800}
            height={800}
          />
        ) : (
          filterdStore.map((el) => {
            return <WishStore key={el.id} storeInfo={el} />;
          })
        )}
      </WishStoreContainer>
    </WishListContainer>
  );
}
export default WishList;

const WishListContainer = styled.section`
  display: flex;
  flex-direction: column;
  margin: 20px;
  width: 100%;
  background-color: #fff;
`;

const WishListHeader = styled.div`
  border-bottom: 2px solid #bbbbbb;
`;

const WishListHeaderText = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin: 10px;
  padding: 5px 5px 5px 15px;
  color: #404040;
`;

const WishStoreContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
