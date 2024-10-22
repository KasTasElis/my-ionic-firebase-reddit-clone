import { IonInput, IonButton, useIonToast } from "@ionic/react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../main";
import { useState } from "react";

type SignInFormProps = {
  onSuccess?: () => void;
};

const SignInForm = ({ onSuccess }: SignInFormProps) => {
  const [present] = useIonToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Sign in form submitted", email, password);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      // console.log("User signed in: ", { userCredential });
      present({
        message: "👋 Welcome!",
        duration: 1500,
        position: "bottom",
        color: "success",
      });

      resetForm();

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error("Woops: ", err);
      present({
        message: "Sign in failed. Please try again.",
        duration: 3000,
        position: "bottom",
        color: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="ion-margin-bottom">
      <IonInput
        label="Email"
        labelPlacement="floating"
        type="email"
        placeholder="Email"
        className="ion-margin-bottom"
        value={email}
        onIonInput={(e) => {
          setEmail(String(e.target.value));
        }}
        required
      ></IonInput>

      <IonInput
        required
        value={password}
        label="Password"
        labelPlacement="floating"
        type="password"
        placeholder="Password"
        className="ion-margin-bottom"
        onIonInput={(e) => {
          setPassword(String(e.target.value));
        }}
      ></IonInput>

      <IonButton
        disabled={loading}
        expand="block"
        color="primary"
        type="submit"
      >
        {loading ? "Signing In..." : "Sign In"}
      </IonButton>
    </form>
  );
};

export { SignInForm };
