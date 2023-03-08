import React from 'react';
import styled from 'styled-components';
import formatDate from 'utils/func/formatDate';
import useHandleInput from 'utils/hooks/useHandleInput';
import StoreService from 'utils/service/StoreService';

function Request() {
  const { input, handleInput, setInput } = useHandleInput();
  const {
    input: textarea,
    handleInput: handleTextarea,
    setInput: setTextarea
  } = useHandleInput();

  const buttonDisabled = !(input.length >= 2 && textarea.length >= 10);

  const sendRequest = () => {
    const content = {
      storeName: input,
      requestReason: textarea,
      postTime: formatDate(new Date())
    };

    StoreService.request(content);

    setInput('');
    setTextarea('');

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
            value={input}
            name='storeName'
            onChange={handleInput}
          />
        </InputWrap>
        <InputWrap>
          <RequestTitle>요청 이유</RequestTitle>
          <RequestReasonTextArea
            rows={10}
            value={textarea}
            name='requestReason'
            onChange={handleTextarea}
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
  border: 2px solid ${(props) => props.theme.mangoOrange};
  border-radius: 5px;
  outline: none;
`;

const RequestReasonTextArea = styled.textarea`
  padding: 20px;
  width: 800px;
  font-size: 20px;
  font-weight: 600;
  border: 2px solid ${(props) => props.theme.mangoOrange};
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
  color: ${(props) => props.theme.mangoOrange};
  background-color: #fff;
  border: 3px solid ${(props) => props.theme.mangoOrange};
  :hover {
    cursor: pointer;
    color: #fff;
    background-color: ${(props) => props.theme.mangoOrange};
    border: none;
  }
  :disabled {
    cursor: default;
    opacity: 0.3;
  }
`;
