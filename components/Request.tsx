import React, { useState } from 'react';
import styled from 'styled-components';
import formatDate from '../utils/hooks/formatDate';
import StoreService from '../utils/service/StoreService';

function Request() {
  const [requestReason, setRequestReason] = useState<string>('');
  const [storeName, setStoreName] = useState<string>('');
  const buttonDisabled = !(storeName.length >= 2 && requestReason.length >= 10);

  const handleRequestReason = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    setRequestReason(value);
  };

  const handleStoreName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setStoreName(value);
  };

  const sendRequest = () => {
    const content = {
      storeName: storeName,
      requestReason: requestReason,
      postTime: formatDate(new Date())
    };
    StoreService.request(content);
    setRequestReason('');
    setStoreName('');
    alert('가게 추가 요청이 접수되었습니다!');
  };

  return (
    <RequestContainer>
      <RequestHeader>
        <RequestHeaderText>추가 문의</RequestHeaderText>
      </RequestHeader>
      <RequestContentContainer>
        <InputWrap>
          <RequestTitle>가게 이름</RequestTitle>
          <StoreNameInput
            value={storeName}
            name='storeName'
            onChange={handleStoreName}
          />
        </InputWrap>
        <InputWrap>
          <RequestTitle>요청 이유</RequestTitle>
          <RequestReasonTextArea
            rows={10}
            value={requestReason}
            name='requestReason'
            onChange={handleRequestReason}
          />
        </InputWrap>
        <SubmitRequset disabled={buttonDisabled} onClick={sendRequest}>
          작성하기
        </SubmitRequset>
      </RequestContentContainer>
    </RequestContainer>
  );
}
export default Request;

const RequestContainer = styled.section`
  display: flex;
  flex-direction: column;
  margin: 20px;
  width: 100%;
  background-color: #fff;
`;

const RequestHeader = styled.div`
  border-bottom: 2px solid #bbbbbb;
`;

const RequestHeaderText = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin: 10px;
  padding: 5px 5px 5px 15px;
  color: #404040;
`;

const RequestContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 20px 0;
`;

const RequestTitle = styled.h2`
  font-size: 26px;
  font-weight: 600;
  letter-spacing: 2px;
  margin-bottom: 15px;
`;

const StoreNameInput = styled.input`
  padding: 20px;
  width: 400px;
  font-size: 18px;
  font-weight: 600;
  border: 2px solid #ff904d;
  border-radius: 5px;
  outline: none;
`;

const RequestReasonTextArea = styled.textarea`
  padding: 20px;
  width: 800px;
  font-size: 20px;
  font-weight: 600;
  border: 2px solid #ff904d;
  border-radius: 5px;
  outline: none;
  line-height: 24px;
  resize: none;
`;

const SubmitRequset = styled.button`
  align-self: flex-end;
  margin: 20px;
  width: 200px;
  height: 100px;
  border-radius: 20px;
  font-size: 36px;
  font-weight: bolder;
  letter-spacing: 3px;
  color: #ff904d;
  background-color: #fff;
  border: 3px solid #ff904d;
  :hover {
    cursor: pointer;
    color: #fff;
    background-color: #ff904d;
    border: none;
  }
  :disabled {
    cursor: default;
    opacity: 0.3;
  }
`;
