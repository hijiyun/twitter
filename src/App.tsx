import { useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import { auth } from "./firebase";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import Login from "./routes/Login";
import CreateAccount from "./components/CreateAccount";

const S = {
  Wrapper: styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
  `,
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const init = async () => {
    await auth.authStateReady();
    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  if (isLoading) return <LoadingScreen />;

  return (
    <S.Wrapper>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="create-account" element={<CreateAccount />} />
      </Routes>
    </S.Wrapper>
  );
}

export default App;
