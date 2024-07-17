import styled from "styled-components";

const USER_S = {
  Wrapper: styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 420px;
    padding: 50px 0px;
  `,
  Title: styled.h1`
    font-size: 42px;
  `,
  Form: styled.form`
    margin-top: 50px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
  `,
  Input: styled.input`
    padding: 10px 20px;
    border-radius: 50px;
    border: none;
    width: 100%;
    font-size: 16px;
    &[type="submit"] {
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
  `,
  Error: styled.span`
    font-weight: 600;
    color: tomato;
  `,
  Switcher: styled.span`
    margin-top: 20px;
    a {
      color: #1d9bf0;
    }
  `,
};

export default USER_S;
