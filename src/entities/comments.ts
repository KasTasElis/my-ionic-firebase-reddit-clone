import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "@firebase/firestore";
import { db, auth } from "../main";

// TODO: increment comment count in post
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
    updatedAt: serverTimestamp(),
  });
};

export const updateComment = (
  postId: string,
  commentId: string,
  { content }: { content: string }
) => {
  return setDoc(
    doc(db, `posts/${postId}/comments`, commentId),
    {
      content,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
};

// export const deletePost = (id: string) => {
//   return deleteDoc(doc(db, "posts", id));
// };
