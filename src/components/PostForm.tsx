import { IonInput, IonTextarea, IonButton } from "@ionic/react";
import { useState } from "react";

type PostFormProps = {
  onSubmit: ({ title, content }: { title: string; content: string }) => void;
  buttonText?: string;
  title?: string;
  content?: string;
};

const PostForm = ({
  onSubmit,
  buttonText = "Post",
  title: initialTitle = "",
  content: initialContent = "",
}: PostFormProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ title, content });
      }}
    >
      <IonInput
        label="Title"
        autofocus
        labelPlacement="floating"
        placeholder="Post title..."
        maxlength={120}
        counter={true}
        value={title}
        counterFormatter={(inputLength, maxLength) =>
          `${maxLength - inputLength} characters remaining`
        }
        onIonChange={(e) => setTitle(String(e.detail.value))}
      ></IonInput>

      <IonTextarea
        className="ion-padding-bottom"
        label="Content"
        labelPlacement="stacked"
        placeholder="Post content..."
        autoGrow={true}
        counter={true}
        maxlength={450}
        counterFormatter={(inputLength, maxLength) =>
          `${maxLength - inputLength} characters remaining`
        }
        value={content}
        onIonChange={(e) => setContent(String(e.detail.value))}
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

export { PostForm };
