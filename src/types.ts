import { Timestamp } from "@firebase/firestore";

export type TPost = {
  id: string;
  userId: string;
  title: string;
  content: string;
  userName: string;
  createdAt: Timestamp;
  upVotes: number;
  downVotes: number;
  commentCount: number;
};
