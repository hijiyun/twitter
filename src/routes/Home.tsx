import styled from "styled-components";
import PostTweetForm from "../components/PostTweetForm";

const S = {
  Wrapper: styled.div``,
};

const Home = () => {
  return (
    <S.Wrapper>
      <PostTweetForm />
    </S.Wrapper>
  );
};

export default Home;
