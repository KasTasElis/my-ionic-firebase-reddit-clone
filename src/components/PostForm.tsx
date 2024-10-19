import { IonInput, IonTextarea, IonButton } from "@ionic/react";

type PostFormProps = {
  onSubmit: () => void;
  buttonText?: string;
  title?: string;
  content?: string;
};

const PostForm = ({
  onSubmit,
  buttonText = "Post",
  title,
  content,
}: PostFormProps) => {
  return (
    <>
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

export { PostForm };
