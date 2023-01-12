import Info from './Info';
import ClickLink from './ClickLink';
import Image from 'next/image';
import styled from 'styled-components';
import { StoreResponse, UserResponse } from '../utils/types/index';
import React, { useEffect, useState } from 'react';
import UserService from '../utils/service/UserService';

interface Props {
  store: StoreResponse;
  userInfo: UserResponse;
  selectedId: number;
}

function LoggedInStoreInfo({ store, userInfo, selectedId }: Props) {
  const {
    id,
    thumbnail,
    store_name,
    address,
    main_menu,
    parking_info,
    click_link
  } = store;
  const [userData, setUserData] = useState<UserResponse>(userInfo);
  const [storeLike, setStoreLike] = useState<boolean>(false);

  const handleLike = async () => {
    if (!storeLike) {
      const { data } = await UserService.likeStore(
        userData.id,
        id,
        userData.like_store
      );
      setUserData(data);
      setStoreLike(data.like_store.includes(id));
    } else {
      const { data } = await UserService.unLikeStore(
        userData.id,
        id,
        userData.like_store
      );
      setUserData(data);
      setStoreLike(data.like_store.includes(id));
    }
  };

  useEffect(() => {
    setStoreLike(userData.like_store.includes(id));
  }, [selectedId]);

  return (
    <StoreInfoWrap>
      <Image
        src={thumbnail}
        alt='store_image'
        width={400}
        height={300}
        style={{ borderRadius: '5px', border: '2px solid #808080' }}
      />
      <StoreName>{store_name}</StoreName>
      <StoreLike onClick={handleLike} storeLike={storeLike}>
        {storeLike ? '찜했어요!' : '찜하기!'}
      </StoreLike>
      <Info title='주소' content={address} />
      <Info title='메인메뉴' content={main_menu} />
      <Info title='주차가능여부' content={parking_info} />
      <ClickLinkContainer>
        맛집사이트 링크
        <ClickLinkWrap>
          <ClickLink type='mango' link={click_link.mango} />
          <ClickLink type='dining' link={click_link.dining} />
        </ClickLinkWrap>
      </ClickLinkContainer>
    </StoreInfoWrap>
  );
}

export default LoggedInStoreInfo;

type StoreLikeType = {
  storeLike: boolean;
};

const StoreInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const StoreName = styled.div`
  display: flex;
  justify-content: center;
  margin: 35px 0 50px;
  width: 100%;
  font-size: 50px;
  color: #505050;
  font-weight: bold;
`;

const ClickLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 34px;
  font-weight: bold;
  color: #505050;
  margin-bottom: 10px;
  letter-spacing: 1.2px;
`;

const ClickLinkWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

const StoreLike = styled.div<StoreLikeType>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 50px 50px;
  width: calc(100% - 100px);
  height: 60px;
  border-radius: 15px;
  border: 3px solid #ff904d;
  background-color: ${({ storeLike }) => (storeLike ? '#ff904d' : '#fff')};
  font-size: 24px;
  font-weight: bolder;
  color: ${({ storeLike }) => (!storeLike ? '#ff904d' : '#fff')};
  letter-spacing: 3px;
  :hover {
    background-color: #ffccac;
    color: #ff904d;
  }
`;
