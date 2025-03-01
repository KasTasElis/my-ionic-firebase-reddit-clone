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
import { CommentForm } from "../CommentForm";
import { createComment } from "../../entities";

interface AddCommentModalProps {
  modalRef: RefObject<HTMLIonModalElement>;
  postId: string;
}

export const AddCommentModal: React.FC<AddCommentModalProps> = ({
  modalRef,
  postId,
}) => {
  const [present] = useIonToast();

  const onSubmitCreateComment = async ({ content }: { content: string }) => {
    try {
      await createComment({ postId, content });

      present({
        message: "Commented successfully",
        duration: 1500,
        color: "success",
      });
      modalRef.current?.dismiss();
    } catch (error) {
      present({
        message: "Failed to comment on post",
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
          <IonTitle>Comment</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <CommentForm onSubmit={onSubmitCreateComment} />
      </IonContent>
    </IonModal>
  );
};
