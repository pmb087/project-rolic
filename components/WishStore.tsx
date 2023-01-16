import Image from 'next/image';
import styled from 'styled-components';
import { StoreResponse } from '../utils/types';

interface Props {
  storeInfo: StoreResponse;
}

function WishStore({ storeInfo }: Props) {
  const {
    id,
    thumbnail,
    store_name,
    parking_info,
    main_menu,
    address,
    click_link
  } = storeInfo;
  return (
    <WishStoreContainer>
      <Image
        src={thumbnail}
        width={400}
        height={280}
        alt='찜 한 가게'
        style={{ borderRadius: '10px', border: '3px solid #ff904dbf' }}
      />
      <WishStoreName>{store_name}</WishStoreName>
    </WishStoreContainer>
  );
}
export default WishStore;

const WishStoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  margin: 10px;
  background-color: #f0f0f0;
  border: 3px solid #ff904dbf;
  border-radius: 10px;
  :hover {
    background-color: #ff904dbf;
    cursor: pointer;
  }
`;

const WishStoreName = styled.h1`
  margin-top: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #606060;
`;
