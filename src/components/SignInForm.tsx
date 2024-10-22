import { IonInput, IonButton } from "@ionic/react";

const SignInForm = () => {
  return (
    <form action="" className="ion-margin-bottom">
      <IonInput
        label="Email"
        labelPlacement="floating"
        type="email"
        placeholder="Email"
        className="ion-margin-bottom"
      ></IonInput>

      <IonInput
        label="Password"
        labelPlacement="floating"
        type="password"
        placeholder="Password"
        className="ion-margin-bottom"
      ></IonInput>

      <IonButton expand="block" color="primary">
        Sign In
      </IonButton>
    </form>
  );
};

export { SignInForm };
