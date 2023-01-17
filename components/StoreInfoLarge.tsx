import Info from './Info';
import ClickLink from './ClickLink';
import Image from 'next/image';
import styled from 'styled-components';
import { StoreResponse } from '../utils/types/index';

interface Props {
  store: StoreResponse;
}

function StoreInfoLarge({ store }: Props) {
  const {
    thumbnail,
    store_name,
    address,
    main_menu,
    parking_info,
    click_link
  } = store;
  return (
    <StoreInfoLargeWrap>
      <Image
        src={thumbnail}
        alt='store_image'
        width={600}
        height={450}
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
    </StoreInfoLargeWrap>
  );
}

export default StoreInfoLarge;

const StoreInfoLargeWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center;
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
  width: 100%;
  font-size: 34px;
  font-weight: bold;
  color: #505050;
  margin-bottom: 10px;
  letter-spacing: 1.2px;
`;

const ClickLinkWrap = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
`;
