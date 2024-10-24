import { useEffect, useRef, useState } from "react";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonNote,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
  useIonToast,
  useIonViewWillEnter,
} from "@ionic/react";
import { personCircle } from "ionicons/icons";
import { useParams } from "react-router";
import "./ViewMessage.css";
import { CommentForm, PostForm } from "../components";
import { TPost } from "../types";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../main";
import { readableDate } from "../utils";
import { onAuthStateChanged, User } from "@firebase/auth";
import { updatePost } from "../entities";

export const ViewPost = () => {
  const params = useParams<{ id: string }>();
  const commentModal = useRef<HTMLIonModalElement>(null);
  const editPostModal = useRef<HTMLIonModalElement>(null);
  const editCommentModal = useRef<HTMLIonModalElement>(null);
  const [post, setPost] = useState<TPost | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const [present] = useIonToast();

  const onSubmitEditPost = async ({
    title,
    content,
  }: Pick<TPost, "title" | "content">) => {
    try {
      const result = await updatePost(params.id, { title, content });
      console.log({ result });
      present({
        message: "Post updated successfully",
        duration: 1500,
        color: "success",
      });
      editPostModal.current?.dismiss();
    } catch (error) {
      present({
        message: "Failed to update post",
        duration: 1500,
        color: "danger",
      });
    }
  };

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log("User is signed in: ", user);
      } else {
        setUser(null);
      }
    });
  }, []);

  useIonViewWillEnter(() => {
    const docRef = doc(db, "posts", params.id);
    return onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setPost(doc.data({ serverTimestamps: "estimate" }) as TPost);
      } else {
        console.log("No such document!");
      }
    });
  });

  return (
    <IonPage id="view-message-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Posts" defaultHref="/home"></IonBackButton>
          </IonButtons>

          {user?.uid === post?.userId && (
            <IonButtons slot="end">
              <IonButton
                color="primary"
                onClick={() => editPostModal.current?.present()}
              >
                ✏️ Edit
              </IonButton>
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {post ? (
          <>
            <IonItem>
              <IonIcon
                aria-hidden="true"
                icon={personCircle}
                color="primary"
              ></IonIcon>
              <IonLabel className="ion-text-wrap">
                <h2>
                  {post.userName}
                  <span className="date">
                    <IonNote>
                      {readableDate(post.updatedAt || post.createdAt)}
                    </IonNote>
                  </span>
                </h2>
              </IonLabel>
            </IonItem>

            <div className="ion-padding">
              <h1>{post.title}</h1>
              <p>{post.content}</p>
            </div>

            <IonModal ref={editCommentModal}>
              <IonHeader>
                <IonToolbar>
                  <IonButtons slot="start">
                    <IonButton
                      color="danger"
                      onClick={() => editCommentModal.current?.dismiss()}
                    >
                      Cancel
                    </IonButton>
                  </IonButtons>
                  <IonTitle>Edit Comment</IonTitle>
                </IonToolbar>
              </IonHeader>
              <IonContent className="ion-padding">
                <CommentForm
                  onSubmit={() => editCommentModal.current?.dismiss()}
                  buttonText="Post Changes"
                  content="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
                />
              </IonContent>
            </IonModal>

            <IonModal ref={commentModal}>
              <IonHeader>
                <IonToolbar>
                  <IonButtons slot="start">
                    <IonButton
                      color="danger"
                      onClick={() => commentModal.current?.dismiss()}
                    >
                      Cancel
                    </IonButton>
                  </IonButtons>
                  <IonTitle>Comment</IonTitle>
                </IonToolbar>
              </IonHeader>
              <IonContent className="ion-padding">
                <CommentForm onSubmit={() => commentModal.current?.dismiss()} />
              </IonContent>
            </IonModal>

            <IonModal ref={editPostModal}>
              <IonHeader>
                <IonToolbar>
                  <IonButtons slot="start">
                    <IonButton
                      color="danger"
                      onClick={() => editPostModal.current?.dismiss()}
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
              </IonContent>
            </IonModal>

            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonButton expand="block" color="success" fill="outline">
                    ⬆️ {post.upVotes} UpVote
                  </IonButton>
                </IonCol>
                <IonCol>
                  <IonButton expand="block" color="danger" fill="outline">
                    ⬇️ {post.downVotes} DownVote
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonButton
                    expand="block"
                    color="primary"
                    fill="outline"
                    onClick={() => commentModal.current?.present()}
                  >
                    💬 Comment
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>

            <IonList>
              <IonListHeader>
                <IonSelect
                  aria-label="Fruit"
                  interface="popover"
                  placeholder="Sort By..."
                  color="medium"
                >
                  <IonSelectOption value="apples">
                    Latest on Top
                  </IonSelectOption>
                  <IonSelectOption value="apples">
                    Oldest on Top
                  </IonSelectOption>
                  <IonSelectOption value="oranges">
                    Most Popular
                  </IonSelectOption>
                </IonSelect>
              </IonListHeader>

              {[1, 2, 3, 4, 5].map((i) => (
                <IonItem key={i}>
                  <IonGrid>
                    <IonRow>
                      <IonCol>
                        <IonText>
                          <h6 style={{ margin: 0 }}>🤖 John Smith</h6>
                        </IonText>
                      </IonCol>
                      <IonCol className="ion-text-end">
                        <IonNote>13m ago</IonNote>
                      </IonCol>
                    </IonRow>

                    <IonRow>
                      <IonCol>
                        <IonText>
                          <p style={{ margin: 0 }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Accusantium non omnis quisquam quia!
                            Praesentium doloremque sit.
                          </p>
                        </IonText>
                      </IonCol>
                    </IonRow>

                    <IonRow>
                      {/* Edit My Comment */}
                      {i !== 2 ? (
                        <>
                          <IonCol>
                            <IonButton
                              expand="block"
                              color="success"
                              fill="clear"
                            >
                              ⬆️ 3 UpVote
                            </IonButton>
                          </IonCol>
                          <IonCol>
                            <IonButton
                              expand="block"
                              color="danger"
                              fill="clear"
                            >
                              ⬇️ 0 DownVote
                            </IonButton>
                          </IonCol>
                        </>
                      ) : (
                        <>
                          <IonCol>
                            <IonButton
                              expand="block"
                              color="primary"
                              fill="clear"
                              onClick={() =>
                                editCommentModal.current?.present()
                              }
                            >
                              ✏️ Edit
                            </IonButton>
                          </IonCol>
                          <IonCol>
                            <IonButton
                              expand="block"
                              color="danger"
                              fill="clear"
                            >
                              🗑️ Delete
                            </IonButton>
                          </IonCol>
                        </>
                      )}
                    </IonRow>
                  </IonGrid>
                </IonItem>
              ))}
            </IonList>
          </>
        ) : (
          <div>Post not found</div>
        )}
      </IonContent>
    </IonPage>
  );
};
