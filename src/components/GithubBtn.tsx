import styled from "styled-components";

const S = {
  Button: styled.span`
    background-color: white;
    font-weight: 600;
    padding: 10px 20px;
    border-radius: 50px;
    border: 0;
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
  `,
  Logo: styled.img`
    height: 25px;
  `,
};

const GithubBtn = () => {
  return (
    <S.Button>
      <S.Logo src="/githubLogo.png" />
      깃허브로 계속하기
    </S.Button>
  );
};

export default GithubBtn;
