import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  deleteDoc,
  getDoc,
} from "@firebase/firestore";
import { db, auth } from "../main";
import { TPost } from "../types";

export const createPost = ({
  title,
  content,
}: Pick<TPost, "title" | "content">) => {
  if (!auth.currentUser) {
    throw new Error("User is not signed in.");
  }

  return addDoc(collection(db, "posts"), {
    title,
    content,
    userId: auth.currentUser.uid,
    userName: auth.currentUser.displayName || auth.currentUser.email,
    upVotes: 0,
    downVotes: 0,
    commentCount: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

export const updatePost = (
  id: string,
  { title, content }: Pick<TPost, "title" | "content">
) => {
  if (!auth.currentUser) {
    throw new Error("User is not signed in.");
  }

  return getDoc(doc(db, "posts", id)).then((docSnap) => {
    if (!docSnap.exists()) {
      throw new Error("Post not found");
    }

    const post = docSnap.data() as TPost;
    if (post.userId !== auth.currentUser!.uid) {
      throw new Error("You don't have permission to edit this post");
    }

    return setDoc(
      doc(db, "posts", id),
      {
        title,
        content,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  });
};

export const deletePost = (id: string) => {
  if (!auth.currentUser) {
    throw new Error("User is not signed in.");
  }

  return getDoc(doc(db, "posts", id)).then((docSnap) => {
    if (!docSnap.exists()) {
      throw new Error("Post not found");
    }

    const post = docSnap.data() as TPost;
    if (post.userId !== auth.currentUser!.uid) {
      throw new Error("You don't have permission to delete this post");
    }

    return deleteDoc(doc(db, "posts", id));
  });
};
