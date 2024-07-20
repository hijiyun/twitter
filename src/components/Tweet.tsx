import { deleteDoc, doc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { ITweet } from "./TimeLine";
import styled from "styled-components";
import { deleteObject, ref } from "firebase/storage";

const S = {
  Wrapper: styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr;
    padding: 20px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 15px;
  `,
  Column: styled.div``,
  Username: styled.span`
    font-weight: 600;
    font-size: 15px;
  `,
  Payload: styled.p`
    margin: 10px 0px;
    font-size: 18px;
  `,
  Photo: styled.img`
    width: 100px;
    height: 100px;
    border-radius: 15px;
  `,
  DeleteButton: styled.button`
    background-color: tomato;
    color: white;
    font-weight: 600;
    border: 0;
    font-size: 12px;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
  `,
};

const Tweet = ({ photo, tweet, userName, userId, id }: ITweet) => {
  const user = auth.currentUser;

  const onDelete = async () => {
    const deleteOkay = confirm("정말 트윗을 삭제하시겠습니까?");
    if (!deleteOkay || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "tweet", id));
      if (photo) {
        const photoRef = ref(storage, `tweet/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <S.Wrapper>
      <S.Column>
        <S.Username>{userName}</S.Username>
        <S.Payload>{tweet}</S.Payload>
        {user?.uid === userId ? (
          <S.DeleteButton onClick={onDelete}>삭제</S.DeleteButton>
        ) : null}
      </S.Column>
      <S.Column>{photo ? <S.Photo src={photo} /> : null}</S.Column>
    </S.Wrapper>
  );
};

export default Tweet;
