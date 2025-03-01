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
  IonNote,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { personCircle } from "ionicons/icons";
import { useParams } from "react-router";
import "./ViewMessage.css";
import {
  AddCommentModal,
  EditCommentModal,
  EditPostModal,
} from "../components";
import { TComment, TPost, TSortOptions } from "../types";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, db } from "../main";
import { getSortingOptions, readableDate } from "../utils";
import { onAuthStateChanged, User } from "@firebase/auth";

export const ViewPost = () => {
  const params = useParams<{ id: string }>();
  const commentModal = useRef<HTMLIonModalElement>(null);
  const editPostModal = useRef<HTMLIonModalElement>(null);
  const editCommentModal = useRef<HTMLIonModalElement>(null);
  const [post, setPost] = useState<TPost | null>(null);
  const [comments, setComments] = useState<TComment[] | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [editingComment, setEditingComment] = useState<TComment | null>(null);
  const [sortBy, setSortBy] = useState<TSortOptions>("latestOnTop");

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  useIonViewWillEnter(() => {
    // observe post
    const docRef = doc(db, "posts", params.id);
    return onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setPost(doc.data({ serverTimestamps: "estimate" }) as TPost);
      } else {
        console.log("No such document!");
      }
    });
  });

  useEffect(() => {
    // observe post comments
    const { field, direction } = getSortingOptions(sortBy);
    const commentsRef = collection(db, `posts/${params.id}/comments`);
    const q = query(commentsRef, orderBy(field, direction));
    return onSnapshot(q, (querySnapshot) => {
      const comments: any[] = [];
      querySnapshot.forEach((doc) => {
        comments.push({
          ...doc.data({ serverTimestamps: "estimate" }),
          id: doc.id,
        });
      });
      setComments(comments);
    });
  }, [sortBy]);

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
                    <IonNote>{readableDate(post.updatedAt)}</IonNote>
                  </span>
                </h2>
              </IonLabel>
            </IonItem>

            <div className="ion-padding">
              <h1>{post.title}</h1>
              <p>{post.content}</p>
            </div>

            <EditCommentModal
              modalRef={editCommentModal}
              postId={params.id}
              comment={editingComment}
              onCommentUpdated={() => setEditingComment(null)}
            />

            <AddCommentModal modalRef={commentModal} postId={params.id} />

            {post && (
              <EditPostModal
                modalRef={editPostModal}
                post={post}
                postId={params.id}
              />
            )}

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
                  value={sortBy}
                  onIonChange={(e) => setSortBy(e.detail.value)}
                >
                  <IonSelectOption value="latestOnTop">
                    Latest on Top
                  </IonSelectOption>
                  <IonSelectOption value="oldestOnTop">
                    Oldest on Top
                  </IonSelectOption>
                  <IonSelectOption value="popularOnTop">
                    Most Popular on Top
                  </IonSelectOption>
                  <IonSelectOption value="unpopularOnTop">
                    Least Popular on Top
                  </IonSelectOption>
                </IonSelect>
              </IonListHeader>

              {comments === null ? (
                <div>Loading...</div>
              ) : comments.length === 0 ? (
                <div>We have no comments...</div>
              ) : (
                comments.map((comment) => (
                  <IonItem key={comment.id}>
                    <IonGrid>
                      <IonRow>
                        <IonCol>
                          <IonText>
                            <h6 style={{ margin: 0 }}>🤖 {comment.userName}</h6>
                          </IonText>
                        </IonCol>
                        <IonCol className="ion-text-end">
                          <IonNote>{readableDate(comment.updatedAt)}</IonNote>
                        </IonCol>
                      </IonRow>

                      <IonRow>
                        <IonCol>
                          <IonText>
                            <p style={{ margin: 0 }}>{comment.content}</p>
                          </IonText>
                        </IonCol>
                      </IonRow>

                      <IonRow>
                        <IonCol>
                          <IonButton
                            expand="block"
                            color="success"
                            fill="clear"
                          >
                            ⬆️ {comment.upVotes} UpVote
                          </IonButton>
                        </IonCol>
                        <IonCol>
                          <IonButton expand="block" color="danger" fill="clear">
                            ⬇️ {comment.downVotes} DownVote
                          </IonButton>
                        </IonCol>

                        {comment.userId === auth.currentUser?.uid ? (
                          <IonCol>
                            <IonButton
                              expand="block"
                              color="primary"
                              fill="clear"
                              onClick={() => {
                                setEditingComment(comment);
                                editCommentModal.current?.present();
                              }}
                            >
                              ✏️ Edit
                            </IonButton>
                          </IonCol>
                        ) : null}
                      </IonRow>
                    </IonGrid>
                  </IonItem>
                ))
              )}
            </IonList>
          </>
        ) : (
          <div>Post not found</div>
        )}
      </IonContent>
    </IonPage>
  );
};
