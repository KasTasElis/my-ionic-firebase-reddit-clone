import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { RefObject } from "react";
import { PostForm } from "../PostForm";
import { TPost } from "../../types";
import { deletePost, updatePost } from "../../entities";
import { useHistory } from "react-router-dom";

interface EditPostModalProps {
  modalRef: RefObject<HTMLIonModalElement>;
  post: TPost;
  postId: string;
}

export const EditPostModal: React.FC<EditPostModalProps> = ({
  modalRef,
  post,
  postId,
}) => {
  const [present] = useIonToast();
  const history = useHistory();

  const onSubmitEditPost = async ({
    title,
    content,
  }: Pick<TPost, "title" | "content">) => {
    try {
      const result = await updatePost(postId, { title, content });
      console.log({ result });
      present({
        message: "Post updated successfully",
        duration: 1500,
        color: "success",
      });
      modalRef.current?.dismiss();
    } catch (error) {
      present({
        message:
          error instanceof Error ? error.message : "Failed to update post",
        duration: 1500,
        color: "danger",
      });
    }
  };

  const onDeletePost = async () => {
    try {
      await deletePost(postId);
      present({
        message: "Post deleted successfully",
        duration: 1500,
        color: "success",
      });
      modalRef.current?.dismiss();
      history.push("/home");
    } catch (error) {
      present({
        message:
          error instanceof Error ? error.message : "Failed to delete post",
        duration: 1500,
        color: "danger",
      });
    }
  };

  return (
    <IonModal ref={modalRef}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              color="danger"
              onClick={() => modalRef.current?.dismiss()}
            >
              Cancel
            </IonButton>
          </IonButtons>
          <IonTitle>Edit Post</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <PostForm
          title={post.title}
          content={post.content}
          onSubmit={onSubmitEditPost}
          buttonText="Post Changes"
        />
        <IonButton
          expand="block"
          color="danger"
          onClick={onDeletePost}
          style={{ marginTop: "1rem" }}
        >
          🗑️ Delete Post
        </IonButton>
      </IonContent>
    </IonModal>
  );
};
