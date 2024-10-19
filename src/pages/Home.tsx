import MessageListItem from "../components/MessageListItem";
import { useRef, useState } from "react";
import { Message, getMessages } from "../data/messages";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonListHeader,
  IonModal,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import "./Home.css";
import { add } from "ionicons/icons";
import { PostForm } from "../components";

const Home: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const createPostModal = useRef<HTMLIonModalElement>(null);
  const signInModal = useRef<HTMLIonModalElement>(null);

  useIonViewWillEnter(() => {
    const msgs = getMessages();
    setMessages(msgs);
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Posts</IonTitle>
          <IonButtons slot="end">
            <IonButton color="primary" id="open-sign-in-modal">
              Sign In
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Posts</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton id="open-create-post-modal" color="success">
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>

        <IonModal ref={signInModal} trigger="open-sign-in-modal">
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton
                  color="danger"
                  onClick={() => signInModal.current?.dismiss()}
                >
                  Cancel
                </IonButton>
              </IonButtons>
              <IonTitle>Sign In</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">Sign in form</IonContent>
        </IonModal>

        <IonModal ref={createPostModal} trigger="open-create-post-modal">
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton
                  color="danger"
                  onClick={() => createPostModal.current?.dismiss()}
                >
                  Cancel
                </IonButton>
              </IonButtons>
              <IonTitle>Create Post</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <PostForm onSubmit={() => createPostModal.current?.dismiss()} />
          </IonContent>
        </IonModal>

        <div className="container">
          <IonList>
            <IonListHeader>
              <IonSelect
                aria-label="Fruit"
                interface="popover"
                placeholder="Sort By..."
                color="medium"
              >
                <IonSelectOption value="apples">Latest on Top</IonSelectOption>
                <IonSelectOption value="apples">Oldest on Top</IonSelectOption>
                <IonSelectOption value="oranges">Most Popular</IonSelectOption>
              </IonSelect>
            </IonListHeader>
            {messages.map((m) => (
              <MessageListItem key={m.id} message={m} />
            ))}
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
