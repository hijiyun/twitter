import styled from "styled-components";
import PostTweetForm from "../components/PostTweetForm";
import TimeLine from "../components/TimeLine";

const S = {
  Wrapper: styled.div`
    display: grid;
    gap: 50px;
    overflow-y: scroll;
    grid-template-rows: 1fr 5fr;
  `,
};

const Home = () => {
  return (
    <S.Wrapper>
      <PostTweetForm />
      <TimeLine />
    </S.Wrapper>
  );
};

export default Home;
