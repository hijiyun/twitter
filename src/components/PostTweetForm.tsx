import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useState } from "react";
import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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
    if (files && files.length === 1) {
      const file = files[0];
      if (file.size < 1048576) {
        // 1MB = 1048576 bytes
        setFile(file);
      } else {
        alert("파일 크기는 1MB 미만이어야 합니다.");
      }
    }
  };

  const onSubmitBtn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user || isLoading || tweet === "" || tweet.length > 180) return;

    try {
      setLoading(true);
      const doc = await addDoc(collection(db, "tweet"), {
        tweet,
        createdAt: Date.now(),
        userName: user.displayName || "Anonymous",
        userId: user.uid,
      });
      if (file) {
        const locationRef = ref(storage, `tweet/${user.uid}/${doc.id}`);
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        updateDoc(doc, {
          photo: url,
        });
      }
      setTweet("");
      setFile(null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Form onSubmit={onSubmitBtn}>
      <S.TextArea
        required
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
