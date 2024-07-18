import { useState } from "react";
import styled from "styled-components";

const S = {
  Form: styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,
  TextArea: styled.textarea`
    border: 2px solid white;
    padding: 20px;
    border-radius: 20px;
    font-size: 16px;
    color: white;
    background-color: black;
    width: 100%;
    height: 150px;
    resize: none;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
    &::placeholder {
      font-size: 16px;
    }
    &:focus {
      outline: none;
      border-color: #1d9bf9;
    }
  `,
  AttachFileButton: styled.label`
    padding: 10px 0px;
    color: #1d9bf9;
    text-align: center;
    border-radius: 20px;
    border: 1px solid #1d9bf9;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
  `,
  AttachFileInput: styled.input`
    display: none;
  `,
  SubmitButton: styled.input`
    background-color: #1d9bf9;
    color: white;
    border: none;
    padding: 10px 0px;
    border-radius: 20px;
    font-size: 16px;
    cursor: pointer;
    &:hover,
    &:active {
      opacity: 0.9;
    }
  `,
};

const PostTweetForm = () => {
  const [isLoading, setLoading] = useState(false);
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e?.target;
    console.log(files);
    if (files && files.length === 1) {
      setFile(files[0]);
    }
  };
  return (
    <S.Form>
      <S.TextArea
        rows={5}
        maxLength={180}
        onChange={onChange}
        value={tweet}
        placeholder="무슨일이 일어났나요 ?"
      />
      <S.AttachFileButton htmlFor="file">
        {file ? file.name : "사진을 추가하세요"}
      </S.AttachFileButton>
      <S.AttachFileInput
        onChange={onFileChange}
        type="file"
        id="file"
        accept="image/*"
      />
      <S.SubmitButton
        type="submit"
        value={isLoading ? "보내는 중 .." : "보내기"}
      />
    </S.Form>
  );
};

export default PostTweetForm;
