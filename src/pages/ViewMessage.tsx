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

            <div className="ion-padding">
              <IonButton color="success" fill="outline">
                ⬆️ 3 UpVote
              </IonButton>
              <IonButton color="danger" fill="outline">
                ⬇️ 0 DownVote
              </IonButton>
              <IonButton color="primary" fill="outline">
                💬 Comment
              </IonButton>
            </div>

            <h3 className="ion-padding">Comments (3)</h3>

            <IonList>
              {[1, 2, 3, 4, 5].map((i) => (
                <IonItem key={i}>
                  <IonGrid>
                    <IonRow>
                      <IonCol>Author Name</IonCol>
                      <IonCol>13m ago</IonCol>
                    </IonRow>
                  </IonGrid>
                  <div>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Delectus magni ratione ex magnam dicta veritatis ullam
                    aperiam?
                  </div>
                  <div className="ion-padding">
                    <IonChip>⬆️ 3</IonChip>
                    <IonChip>⬇️ 0</IonChip>
                  </div>
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
