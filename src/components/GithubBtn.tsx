import styled from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";

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

const GithubBtn = () => {
  const navigate = useNavigate();

  const githubLogin = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <S.Button onClick={githubLogin}>
      <S.Logo src="/githubLogo.png" />
      깃허브로 로그인
    </S.Button>
  );
};

export default GithubBtn;
