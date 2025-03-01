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
import { createPost } from "../../entities";

interface CreatePostModalProps {
  modalRef: RefObject<HTMLIonModalElement>;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  modalRef,
}) => {
  const [present] = useIonToast();

  const handleCreatePostOnSubmit = async ({
    title,
    content,
  }: Pick<TPost, "title" | "content">) => {
    try {
      await createPost({ title, content });
      present({
        message: "🎉 Post Created!",
        duration: 1500,
        position: "bottom",
        color: "success",
      });
      modalRef.current?.dismiss();
    } catch (e) {
      console.error(e);
      present({
        message: "😢 Something went wrong...",
        duration: 1500,
        position: "bottom",
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
          <IonTitle>Create Post</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <PostForm onSubmit={handleCreatePostOnSubmit} />
      </IonContent>
    </IonModal>
  );
};
