import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  deleteDoc,
} from "@firebase/firestore";
import { db, auth } from "../main";
import { TPost } from "../types";

export const createPost = ({
  title,
  content,
}: Pick<TPost, "title" | "content">) => {
  return addDoc(collection(db, "posts"), {
    title,
    content,
    userId: auth.currentUser?.uid,
    userName: auth.currentUser?.email,
    upVotes: 0,
    downVotes: 0,
    commentCount: 0,
    createdAt: serverTimestamp(),
  });
};

export const updatePost = (
  id: string,
  { title, content }: Pick<TPost, "title" | "content">
) => {
  return setDoc(doc(db, "posts", id), {
    title,
    content,
    updatedAt: serverTimestamp(),
  });
};

export const deletePost = (id: string) => {
  return deleteDoc(doc(db, "posts", id));
};
