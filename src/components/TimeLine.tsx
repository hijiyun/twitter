import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Tweet from "./Tweet";
import { Unsubscribe } from "firebase/auth";

export interface ITweet {
  id: string;
  createdAt: number;
  photo: string;
  tweet: string;
  userId: string;
  userName: string;
}

const S = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
  `,
};

const TimeLine = () => {
  const [tweet, setTweet] = useState<ITweet[]>([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchTweet = async () => {
      const tweetQuery = query(
        collection(db, "tweet"),
        orderBy("createdAt", "desc"),
        limit(25)
      );
      unsubscribe = await onSnapshot(tweetQuery, (snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
          const { createdAt, photo, tweet, userId, userName } = doc.data();
          return {
            createdAt,
            photo,
            tweet,
            userId,
            userName,
            id: doc.id,
          };
        });
        setTweet(tweets);
      });
    };
    fetchTweet();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);
  return (
    <S.Wrapper>
      {tweet.map((item) => (
        <Tweet key={item.id} {...item} />
      ))}
    </S.Wrapper>
  );
};

export default TimeLine;
