import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

interface Props {
  storeName: string;
  requestReason: string;
  setModal: Dispatch<SetStateAction<boolean>>;
}

function RequestModal({ storeName, requestReason, setModal }: Props) {
  return (
    <RequestModalContainer>
      <ModalBox>
        <ModalHeader>
          <ModalHeaderText>{storeName}</ModalHeaderText>
          <ModalCloseButton onClick={() => setModal(false)}>X</ModalCloseButton>
        </ModalHeader>
        <ModalReason>{requestReason}</ModalReason>
      </ModalBox>
    </RequestModalContainer>
  );
}

export default RequestModal;

const RequestModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #505050bf;
`;

const ModalBox = styled.div`
  width: 500px;
  height: 800px;
  border-radius: 20px;
  background-color: #fff;
`;

const ModalHeader = styled.div`
  position: relative;
  border-bottom: 1px solid #909090;
  display: flex;
  justify-content: center;
  margin: 0 20px;
`;

const ModalHeaderText = styled.p`
  padding: 15px;
  font-size: 30px;
  font-weight: 600;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 10px;
  width: 20px;
  height: 25px;
  border: none;
  outline: none;
  background-color: #fff;
  font-size: 30px;
  :hover {
    cursor: pointer;
    color: #ff904d;
  }
`;

const ModalReason = styled.div`
  margin: 20px;
  line-height: 35px;
  font-size: 30px;
`;
