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
import { TComment } from "../../types";
import { updateComment } from "../../entities";

interface EditCommentModalProps {
  modalRef: RefObject<HTMLIonModalElement>;
  postId: string;
  comment: TComment | null;
  onCommentUpdated: () => void;
}

export const EditCommentModal: React.FC<EditCommentModalProps> = ({
  modalRef,
  postId,
  comment,
  onCommentUpdated,
}) => {
  const [present] = useIonToast();

  const handleSubmit = async ({ content }: { content: string }) => {
    if (!comment) return;

    try {
      await updateComment(postId, comment.id, { content });
      present({
        message: "Comment updated successfully",
        duration: 1500,
        color: "success",
      });
      onCommentUpdated();
      modalRef.current?.dismiss();
    } catch (error) {
      present({
        message:
          error instanceof Error ? error.message : "Failed to update comment",
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
          <IonTitle>Edit Comment</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <CommentForm
          onSubmit={handleSubmit}
          buttonText="Post Changes"
          content={comment?.content || ""}
        />
      </IonContent>
    </IonModal>
  );
};
