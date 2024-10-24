import { Timestamp } from "@firebase/firestore";

export type TPost = {
  id: string;
  userId: string;
  title: string;
  content: string;
  userName: string;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
  upVotes: number;
  downVotes: number;
  commentCount: number;
};

export type TComment = {
  id: string;
  content: string;
  userId: string;
  userName: string;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
  upVotes: number;
  downVotes: number;
};
