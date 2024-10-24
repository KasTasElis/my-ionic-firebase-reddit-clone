import { IonInput, IonTextarea, IonButton } from "@ionic/react";
import { useState } from "react";

type PostFormProps = {
  onSubmit: ({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) => Promise<unknown>;
  buttonText?: string;
  title?: string;
  content?: string;
  submitDisabled?: boolean;
};

const PostForm = ({
  onSubmit,
  buttonText = "Post",
  submitDisabled = false,
  title: initialTitle = "",
  content: initialContent = "",
}: PostFormProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const resetForm = () => {
    setTitle("");
    setContent("");
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        await onSubmit({ title, content });
        resetForm();
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
        onIonInput={(e) => setTitle(String(e.target.value))}
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
        onIonInput={(e) => setContent(String(e.target.value))}
      ></IonTextarea>

      <IonButton
        expand="block"
        color="success"
        className="ion-margin-top"
        type="submit"
        disabled={submitDisabled}
      >
        {buttonText}
      </IonButton>
    </form>
  );
};

export { PostForm };
