import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import "./ViewMessage.css";

function EditPost() {
  return (
    <IonPage id="view-message-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Cancel" defaultHref="/home"></IonBackButton>
          </IonButtons>

          <IonButtons slot="end">
            <IonButton routerLink="">Save</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div>Edit Post</div>
      </IonContent>
    </IonPage>
  );
}

export default EditPost;
