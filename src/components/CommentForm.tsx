import { IonTextarea, IonButton } from "@ionic/react";

type CommentFormProps = {
  onSubmit: () => void;
  buttonText?: string;
  content?: string;
};

const CommentForm = ({
  onSubmit,
  buttonText = "Post Comment",
  content,
}: CommentFormProps) => {
  return (
    <>
      <IonTextarea
        className="ion-padding-bottom"
        label="Comment"
        labelPlacement="stacked"
        placeholder="Your comment..."
        autoGrow={true}
        counter={true}
        autofocus
        maxlength={350}
        counterFormatter={(inputLength, maxLength) =>
          `${maxLength - inputLength} characters remaining`
        }
        value={content}
      ></IonTextarea>

      <IonButton
        expand="block"
        color="success"
        className="ion-margin-top"
        onClick={onSubmit}
      >
        {buttonText}
      </IonButton>
    </>
  );
};

export { CommentForm };
