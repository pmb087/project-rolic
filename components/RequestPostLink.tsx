import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import RequestModal from 'components/RequestModal';
import StoreService from 'utils/service/StoreService';
import { RequestGetContent } from 'utils/types';

interface Props {
  currentRequest: RequestGetContent;
  allRequest: RequestGetContent[];
  setRequest: Dispatch<SetStateAction<RequestGetContent[] | undefined>>;
  index: number;
}

function RequestPostLink({
  currentRequest,
  setRequest,
  allRequest,
  index
}: Props) {
  const { id, storeName, postTime, requestReason } = currentRequest;
  const [toggleModal, setToggleModal] = useState(false);

  const deleteRequestData = () => {
    StoreService.deleteRequest(id);
    setRequest(allRequest!.filter((el) => el.id !== id));
  };

  return (
    <>
      {toggleModal && (
        <RequestModal
          storeName={storeName}
          requestReason={requestReason}
          setModal={setToggleModal}
        />
      )}
      <RequestPostLinkContainer header={false}>
        <RequestPostNumber>{index + 1}</RequestPostNumber>
        <RequestPostName onClick={() => setToggleModal(true)}>
          {storeName}
        </RequestPostName>
        <RequestPostTime>{postTime}</RequestPostTime>
        <DeleteButton onClick={deleteRequestData}>삭제</DeleteButton>
      </RequestPostLinkContainer>
    </>
  );
}

export default RequestPostLink;

type PostHeader = {
  header: boolean;
};

const RequestPostLinkContainer = styled.div<PostHeader>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #c0c0c0;
  font-size: 20px;
  font-weight: 600;
  color: #444444;
  :hover {
    background-color: ${({ header }) => (header ? 'none' : '#ff904d1a')};
  }
`;

const RequestPostTime = styled.p`
  width: 120px;
`;

const DeleteButton = styled.button`
  width: 50px;
  min-width: 50px;
  height: 30px;
  margin-right: 10px;
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

const RequestPostName = styled.p`
  width: calc(100% - 120px - 120px);
  :hover {
    color: #ff904d;
    cursor: pointer;
  }
`;

const RequestPostNumber = styled.p`
  width: 120px;
  text-align: center;
`;
