import { updateProfile } from "@firebase/auth";
import { auth } from "../main";

export const onSubmitUpdateProfile = async (username: string) => {
  if (!auth.currentUser) {
    throw new Error("User is not signed in.");
  }

  return updateProfile(auth.currentUser, {
    displayName: username,
  });
};
