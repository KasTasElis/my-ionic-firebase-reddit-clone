import { useState } from "react";
import { Message, getMessage } from "../data/messages";
import {
  IonBackButton,
  IonBadge,
  IonButton,
  IonButtons,
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonRow,
  IonText,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { personCircle } from "ionicons/icons";
import { useParams } from "react-router";
import "./ViewMessage.css";

function ViewMessage() {
  const [message, setMessage] = useState<Message>();
  const params = useParams<{ id: string }>();

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
            <IonButton color="primary" routerLink="/message/:id/edit">
              Edit
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
                  <IonButton expand="block" color="primary" fill="outline">
                    💬 Comment
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>

            <h3 className="ion-padding-horizontal">Comments</h3>

            <IonList>
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
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Accusantium non omnis quisquam quia!
                            Praesentium doloremque sit.
                          </p>
                        </IonText>
                      </IonCol>
                    </IonRow>

                    <IonRow>
                      <IonCol>
                        <IonButton expand="block" color="success" fill="clear">
                          ⬆️ 3 UpVote
                        </IonButton>
                      </IonCol>
                      <IonCol>
                        <IonButton expand="block" color="danger" fill="clear">
                          ⬇️ 0 DownVote
                        </IonButton>
                      </IonCol>
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
