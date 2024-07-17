import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import S from "../components/authComponents";
import GithubBtn from "../components/GithubBtn";

const CreateAccount = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // 화면이 새로고침 되지 않도록 preventDefault()를 추가해준다.
    e.preventDefault();
    setError("");
    if (isLoading || email === "" || name === "" || password === "") return;
    try {
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(credentials.user);
      await updateProfile(credentials.user, {
        displayName: name,
      });
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
      <S.Title>회원가입</S.Title>
      <S.Form onSubmit={onSubmit}>
        <S.Input
          name="name"
          value={name}
          placeholder="이름을 입력해 주세요"
          onChange={onChange}
          required
        />
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
        <S.Input type="submit" value={isLoading ? "Loading ..." : "버튼"} />
      </S.Form>
      {error !== "" ? <S.Error>{error}</S.Error> : null}
      <S.Switcher>
        이미 계정이 있으신가요?{" "}
        <Link to={"/login"}>로그인 하러가기 &rarr;</Link>
      </S.Switcher>
      <GithubBtn />
    </S.Wrapper>
  );
};

export default CreateAccount;
