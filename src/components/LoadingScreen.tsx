import React from "react";
import styled from "styled-components";

const S = {
  Wrapper: styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Text: styled.span`
    font-size: 24px;
  `,
};
const LoadingScreen = () => {
  return (
    <S.Wrapper>
      <S.Text>Loading ... </S.Text>
    </S.Wrapper>
  );
};

export default LoadingScreen;
