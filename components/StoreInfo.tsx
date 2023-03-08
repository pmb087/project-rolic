import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Info from '@/components/Info';
import ClickLink from '@/components/ClickLink';
import { StoreResponse } from '@/utils/types/index';

interface Props {
  store: StoreResponse;
}

function StoreInfo({ store }: Props) {
  const {
    thumbnail,
    store_name,
    address,
    main_menu,
    parking_info,
    click_link
  } = store;
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

export default StoreInfo;

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
