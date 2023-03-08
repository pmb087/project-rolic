import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Info from '@/components/Info';
import ClickLink from '@/components/ClickLink';
import { StoreResponse, UserResponse } from '@/utils/types/index';
import useLikeStore from '@/utils/hooks/useLikeStore';

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

  const { handleLike, storeLike } = useLikeStore(userInfo, id, selectedId);

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
  color: ${(props) => props.theme.darkGray};
  font-size: 50px;
  font-weight: bold;
`;

const ClickLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  color: ${(props) => props.theme.darkGray};
  font-size: 34px;
  font-weight: bold;
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
  background-color: ${({ storeLike, theme }) =>
    storeLike ? theme.mangoOrange : '#fff'};
  border: 3px solid ${(props) => props.theme.mangoOrange};
  border-radius: 15px;
  color: ${({ storeLike, theme }) => (!storeLike ? theme.mangoOrange : '#fff')};
  font-size: 24px;
  font-weight: bolder;
  letter-spacing: 3px;
  :hover {
    background-color: #ffccac;
    color: ${(props) => props.theme.mangoOrange};
  }
`;
