import { IonTextarea, IonButton } from "@ionic/react";
import { useState } from "react";

type CommentFormProps = {
  onSubmit: ({ content }: { content: string }) => Promise<unknown>;
  buttonText?: string;
  content?: string;
};

const CommentForm = ({
  onSubmit,
  buttonText = "Post Comment",
  content: initialContent = "",
}: CommentFormProps) => {
  const [content, setContent] = useState(initialContent);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        onSubmit({ content });
      }}
    >
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
        onIonInput={(e) => setContent(String(e.detail.value))}
      ></IonTextarea>

      <IonButton
        expand="block"
        color="success"
        className="ion-margin-top"
        type="submit"
      >
        {buttonText}
      </IonButton>
    </form>
  );
};

export { CommentForm };
