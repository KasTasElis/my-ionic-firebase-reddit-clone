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
  IonList,
  IonListHeader,
  IonModal,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  useIonToast,
  useIonViewWillEnter,
} from "@ionic/react";
import "./Home.css";
import { add, logoGoogle } from "ionicons/icons";
import { PostForm } from "../components";

const Home: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const createPostModal = useRef<HTMLIonModalElement>(null);
  const signInModal = useRef<HTMLIonModalElement>(null);
  const profileModal = useRef<HTMLIonModalElement>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const [present] = useIonToast();

  useIonViewWillEnter(() => {
    const msgs = getMessages();
    setMessages(msgs);
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  const signIn = () => {
    setIsSignedIn(true);
    present({
      message: "👋 Welcome John Doe!",
      duration: 1500,
      position: "bottom",
      color: "success",
    });
    signInModal.current?.dismiss();
  };

  const signOut = () => {
    setIsSignedIn(false);
    present({
      message: "👋 Bye bye...",
      duration: 1500,
      position: "bottom",
      color: "success",
    });
    profileModal.current?.dismiss();
  };

  const saveProfileChanges = () => {
    present({
      message: "👍 Profile Updated!",
      duration: 1500,
      position: "bottom",
      color: "success",
    });
    profileModal.current?.dismiss();
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>🧸 Eli's Reddit</IonTitle>
          <IonButtons slot="end">
            {isSignedIn ? (
              <IonButton
                color="primary"
                onClick={() => profileModal.current?.present()}
              >
                🙋‍♂️ Profile
              </IonButton>
            ) : (
              <IonButton
                color="primary"
                onClick={() => signInModal.current?.present()}
              >
                Sign In
              </IonButton>
            )}
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
          <IonFabButton
            onClick={() => createPostModal.current?.present()}
            color="secondary"
          >
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>

        <IonModal ref={profileModal}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton
                  color="danger"
                  onClick={() => profileModal.current?.dismiss()}
                >
                  Close
                </IonButton>
              </IonButtons>
              <IonTitle>My Profile</IonTitle>
              <IonButtons slot="end">
                <IonButton color="danger" onClick={signOut}>
                  Sign Out
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonInput
              label="Username"
              labelPlacement="floating"
              placeholder="Enter Username"
              className="ion-margin-bottom"
              maxlength={26}
              counter={true}
              counterFormatter={(inputLength, maxLength) =>
                `${maxLength - inputLength} characters remaining`
              }
            ></IonInput>

            <IonButton
              expand="block"
              color="success"
              onClick={saveProfileChanges}
            >
              Save Changes
            </IonButton>
          </IonContent>
        </IonModal>

        <IonModal ref={signInModal}>
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
          <IonContent className="ion-padding">
            <IonButton expand="block" color="primary" onClick={signIn}>
              <IonIcon slot="start" icon={logoGoogle}></IonIcon>
              Sign in With Google
            </IonButton>
          </IonContent>
        </IonModal>

        <IonModal ref={createPostModal}>
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
