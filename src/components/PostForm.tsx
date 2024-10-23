import { IonInput, IonTextarea, IonButton, useIonToast } from "@ionic/react";
import { useState } from "react";
import { serverTimestamp, addDoc, collection } from "firebase/firestore";
import { db, auth } from "../main";

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
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setTitle("");
    setContent("");
    setLoading(false);
  };

  const [present] = useIonToast();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        try {
          await addDoc(collection(db, "posts"), {
            title,
            content,
            userId: auth.currentUser?.uid,
            userName: auth.currentUser?.email,
            upVotes: 0,
            downVotes: 0,
            commentCount: 0,
            createdAt: serverTimestamp(),
          });
          present({
            message: "Post added successfully",
            duration: 1500,
            position: "bottom",
            color: "success",
          });
          onSubmit({ title, content });
        } catch (error) {
          console.error("Error adding document: ", error);
          present({
            message: "Error adding document",
            duration: 1500,
            position: "bottom",
            color: "danger",
          });
        } finally {
          reset();
        }
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
        disabled={loading}
      >
        {loading ? "Loading..." : buttonText}
      </IonButton>
    </form>
  );
};

export { PostForm };
