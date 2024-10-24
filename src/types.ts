import { Timestamp } from "@firebase/firestore";

export type TEntityBase = {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type TUserInfo = {
  userName: string;
  userId: string;
};

export type TVotes = {
  upVotes: number;
  downVotes: number;
};

export type TPost = {
  title: string;
  content: string;
  commentCount: number;
} & TEntityBase &
  TUserInfo &
  TVotes;

export type TComment = {
  content: string;
} & TEntityBase &
  TUserInfo &
  TVotes;

export type TSortOptions =
  | "latestOnTop"
  | "oldestOnTop"
  | "popularOnTop"
  | "unpopularOnTop";
