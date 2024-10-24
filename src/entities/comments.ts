import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  deleteDoc,
  Timestamp,
} from "@firebase/firestore";
import { db, auth } from "../main";

type TComment = {
  id: string;
  content: string;
  userId: string;
  userName: string;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
  upVotes: number;
  downVotes: number;
};

export const createComment = ({
  postId,
  content,
}: {
  postId: string;
  content: string;
}) => {
  if (!auth.currentUser) {
    throw new Error("User is not signed in.");
  }

  return addDoc(collection(db, `posts/${postId}/comments`), {
    content,
    userId: auth.currentUser.uid,
    userName: auth.currentUser.displayName || auth.currentUser.email,
    upVotes: 0,
    downVotes: 0,
    createdAt: serverTimestamp(),
  });
};

// export const updatePost = (
//   id: string,
//   { title, content }: Pick<TPost, "title" | "content">
// ) => {
//   return setDoc(
//     doc(db, "posts", id),
//     {
//       title,
//       content,
//       updatedAt: serverTimestamp(),
//     },
//     { merge: true }
//   );
// };

// export const deletePost = (id: string) => {
//   return deleteDoc(doc(db, "posts", id));
// };
