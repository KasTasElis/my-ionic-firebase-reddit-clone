import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  getDoc,
  deleteDoc,
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
  if (!auth.currentUser) {
    throw new Error("User is not signed in.");
  }

  return getDoc(doc(db, `posts/${postId}/comments`, commentId)).then(
    (docSnap) => {
      if (!docSnap.exists()) {
        throw new Error("Comment not found");
      }

      const comment = docSnap.data();
      if (comment.userId !== auth.currentUser!.uid) {
        throw new Error("You don't have permission to edit this comment");
      }

      return setDoc(
        doc(db, `posts/${postId}/comments`, commentId),
        {
          content,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    }
  );
};

export const deleteComment = (postId: string, commentId: string) => {
  if (!auth.currentUser) {
    throw new Error("User is not signed in.");
  }

  return getDoc(doc(db, `posts/${postId}/comments`, commentId)).then(
    (docSnap) => {
      if (!docSnap.exists()) {
        throw new Error("Comment not found");
      }

      const comment = docSnap.data();
      if (comment.userId !== auth.currentUser!.uid) {
        throw new Error("You don't have permission to delete this comment");
      }

      return deleteDoc(doc(db, `posts/${postId}/comments`, commentId));
    }
  );
};
