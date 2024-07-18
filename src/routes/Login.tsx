import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import S from "../components/authComponents";
import GithubBtn from "../components/GithubBtn";
import GoogleBtn from "../components/GoogleBtn";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // 화면이 새로고침 되지 않도록 preventDefault()를 추가해준다.
    e.preventDefault();
    setError("");
    if (isLoading || email === "" || password === "") return;
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      // setError()
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Wrapper>
      <S.Title>로그인</S.Title>
      <S.Form onSubmit={onSubmit}>
        <S.Input
          name="email"
          value={email}
          placeholder="이메일을 입력해 주세요"
          onChange={onChange}
          required
        />
        <S.Input
          name="password"
          type="password"
          value={password}
          placeholder="비밀번호를 입력해주세요"
          onChange={onChange}
          required
        />
        <S.Input type="submit" value={isLoading ? "Loading ..." : "login"} />
      </S.Form>
      {error !== "" ? <S.Error>{error}</S.Error> : null}
      <S.Switcher>
        계정이 없으신가요? <Link to={"/create-account"}>만들러가기 &rarr;</Link>
      </S.Switcher>
      <S.SocialLogin>
        <GithubBtn />
        <GoogleBtn />
      </S.SocialLogin>
    </S.Wrapper>
  );
};

export default Login;
