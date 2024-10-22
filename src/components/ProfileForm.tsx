import { IonInput, IonButton } from "@ionic/react";
import { useState } from "react";

type ProfileFormProps = {
  username: string;
  onSubmit: (username: string) => void;
};

export const ProfileForm = ({
  username: defaultUserName,
  onSubmit,
}: ProfileFormProps) => {
  const [userName, setUserName] = useState(defaultUserName);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(userName);
      }}
    >
      <IonInput
        value={userName}
        onIonChange={(e) => setUserName(e.detail.value!)}
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

      <IonButton expand="block" color="success" type="submit">
        Save Changes
      </IonButton>
    </form>
  );
};
