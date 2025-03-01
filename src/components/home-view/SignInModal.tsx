import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { RefObject } from "react";
import { SignInForm } from "../SignInForm";
import { logoGoogle } from "ionicons/icons";

interface SignInModalProps {
  modalRef: RefObject<HTMLIonModalElement>;
}

export const SignInModal: React.FC<SignInModalProps> = ({ modalRef }) => {
  return (
    <IonModal ref={modalRef}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              color="danger"
              onClick={() => modalRef.current?.dismiss()}
            >
              Cancel
            </IonButton>
          </IonButtons>
          <IonTitle>Sign In</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <SignInForm onSuccess={() => modalRef.current?.dismiss()} />

        <IonText>
          <h4 className="ion-text-center ion-margin">OR</h4>
        </IonText>

        <IonButton expand="block" color="primary" fill="outline">
          <IonIcon slot="start" icon={logoGoogle}></IonIcon>
          Sign in With Google
        </IonButton>
      </IonContent>
    </IonModal>
  );
};
