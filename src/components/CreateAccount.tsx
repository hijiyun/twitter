import { useState } from "react";
import styled from "styled-components";

const S = {
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
};

const CreateAccount = () => {
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
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // 화면이 새로고침 되지 않도록 preventDefault()를 추가해준다.
    e.preventDefault();
    console.log(name, email, password);
    try {
    } catch (e) {
      // setError()
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
          value={password}
          placeholder="비밀번호를 입력해주세요"
          onChange={onChange}
          required
        />
        <S.Input type="submit" value={isLoading ? "Loading ..." : "버튼"} />
      </S.Form>
      {error !== "" ? <S.Error>{error}</S.Error> : null}
    </S.Wrapper>
  );
};

export default CreateAccount;
