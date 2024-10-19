import { useRef, useState } from "react";
import { Message, getMessage } from "../data/messages";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
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
  useIonViewWillEnter,
} from "@ionic/react";
import { personCircle } from "ionicons/icons";
import { useParams } from "react-router";
import "./ViewMessage.css";

function ViewMessage() {
  const [message, setMessage] = useState<Message>();
  const params = useParams<{ id: string }>();
  const commentModal = useRef<HTMLIonModalElement>(null);
  const editModal = useRef<HTMLIonModalElement>(null);

  useIonViewWillEnter(() => {
    const msg = getMessage(parseInt(params.id, 10));
    setMessage(msg);
  });

  return (
    <IonPage id="view-message-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Posts" defaultHref="/home"></IonBackButton>
          </IonButtons>

          <IonButtons slot="end">
            <IonButton color="primary" id="open-edit-modal">
              ✏️ Edit
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {message ? (
          <>
            <IonItem>
              <IonIcon
                aria-hidden="true"
                icon={personCircle}
                color="primary"
              ></IonIcon>
              <IonLabel className="ion-text-wrap">
                <h2>
                  {message.fromName}
                  <span className="date">
                    <IonNote>{message.date}</IonNote>
                  </span>
                </h2>
              </IonLabel>
            </IonItem>

            <div className="ion-padding">
              <h1>{message.subject}</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>

            <IonModal ref={commentModal} trigger="open-comment-modal">
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
                  <IonButtons slot="end">
                    <IonButton
                      strong={true}
                      onClick={() => commentModal.current?.dismiss()}
                      color="success"
                    >
                      Post
                    </IonButton>
                  </IonButtons>
                </IonToolbar>
              </IonHeader>
              <IonContent className="ion-padding">
                Comment Content...
              </IonContent>
            </IonModal>

            <IonModal ref={editModal} trigger="open-edit-modal">
              <IonHeader>
                <IonToolbar>
                  <IonButtons slot="start">
                    <IonButton
                      color="danger"
                      onClick={() => editModal.current?.dismiss()}
                    >
                      Cancel
                    </IonButton>
                  </IonButtons>
                  <IonTitle>Edit Post</IonTitle>
                  <IonButtons slot="end">
                    <IonButton
                      strong={true}
                      onClick={() => editModal.current?.dismiss()}
                      color="success"
                    >
                      Save
                    </IonButton>
                  </IonButtons>
                </IonToolbar>
              </IonHeader>
              <IonContent className="ion-padding">Post Content...</IonContent>
            </IonModal>

            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonButton expand="block" color="success" fill="outline">
                    ⬆️ 3 UpVote
                  </IonButton>
                </IonCol>
                <IonCol>
                  <IonButton expand="block" color="danger" fill="outline">
                    ⬇️ 0 DownVote
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonButton
                    expand="block"
                    color="primary"
                    fill="outline"
                    id="open-comment-modal"
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
          <div>Message not found</div>
        )}
      </IonContent>
    </IonPage>
  );
}

export default ViewMessage;
