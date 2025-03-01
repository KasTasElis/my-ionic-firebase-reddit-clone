import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { RefObject } from "react";
import { ProfileForm } from "../ProfileForm";
import { User } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { auth } from "../../main";

interface ProfileModalProps {
  modalRef: RefObject<HTMLIonModalElement>;
  user: User;
  setUser: (user: User) => void;
  onSignOut: () => Promise<void>;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  modalRef,
  user,
  setUser,
  onSignOut,
}) => {
  const [present] = useIonToast();

  const onSubmitUpdateProfile = async (username: string) => {
    try {
      // TODO: should come up with a way to update all mentions of the user's name in posts and comments (a server function?)

      // i can assume the user will be there, because
      // the modal that triggers this function is only available to signed in users.

      await updateProfile(auth.currentUser!, {
        displayName: username,
      });

      const updatedUserProfile: User = {
        ...user,
        displayName: username,
      };
      setUser(updatedUserProfile);

      modalRef.current?.dismiss();

      present({
        message: "👍 Profile Updated!",
        duration: 1500,
        position: "bottom",
        color: "success",
      });
    } catch (error) {
      console.error(error);
      present({
        message: "😢 Something went wrong...",
        duration: 1500,
        position: "bottom",
        color: "danger",
      });
    }
  };

  const getDisplayName = () => {
    return user?.displayName || user?.email || "Unknown";
  };

  return (
    <IonModal ref={modalRef}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              color="danger"
              onClick={() => modalRef.current?.dismiss()}
            >
              Close
            </IonButton>
          </IonButtons>
          <IonTitle>My Profile</IonTitle>
          <IonButtons slot="end">
            <IonButton color="danger" onClick={onSignOut}>
              Sign Out
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <ProfileForm
          username={getDisplayName()}
          onSubmit={onSubmitUpdateProfile}
        />
      </IonContent>
    </IonModal>
  );
};
