import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";

const S = {
  Button: styled.span`
    margin-top: 50px;
    background-color: white;
    font-weight: 500;
    color: black;
    padding: 10px 20px;
    border-radius: 50px;
    border: 0;
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  `,
  Logo: styled.img`
    height: 25px;
  `,
};

const GoogleBtn = () => {
  const navigate = useNavigate();

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((data) => {
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <S.Button onClick={googleLogin}>
      <S.Logo src="/googleLogo.jpeg" />
      구글로 로그인
    </S.Button>
  );
};

export default GoogleBtn;
