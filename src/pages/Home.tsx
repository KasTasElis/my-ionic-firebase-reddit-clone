import { useEffect, useRef, useState } from "react";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonList,
  IonListHeader,
  IonModal,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import "./Home.css";
import { add, logoGoogle } from "ionicons/icons";
import { PostForm } from "../components";
import { SignInForm } from "../components/SignInForm";
import { auth, db } from "../main";
import { onAuthStateChanged, User } from "firebase/auth";
import { ProfileForm } from "../components/ProfileForm";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { TPost, TSortOptions } from "../types";
import { Post } from "../components/Post";
import { createPost } from "../entities";
import { updateProfile } from "firebase/auth";
import { getSortingOptions } from "../utils";

const Home = () => {
  const createPostModal = useRef<HTMLIonModalElement>(null);
  const signInModal = useRef<HTMLIonModalElement>(null);
  const profileModal = useRef<HTMLIonModalElement>(null);
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<TPost[]>([]);
  const [sortBy, setSortBy] = useState<TSortOptions>("latestOnTop");

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
        ...(user as User),
        displayName: username,
      };
      setUser(updatedUserProfile);

      profileModal.current?.dismiss();

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

  useEffect(() => {
    const { field, direction } = getSortingOptions(sortBy);
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy(field, direction));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const posts: TPost[] = [];
      querySnapshot.forEach((doc) => {
        posts.push({
          ...doc.data({ serverTimestamps: "estimate" }), // prevents null problem
          id: doc.id,
        } as TPost);
      });

      setPosts(posts);
    });

    return unsubscribe;
  }, [sortBy]);

  const handleCreatePostOnSubmit = async ({
    title,
    content,
  }: Pick<TPost, "title" | "content">) => {
    try {
      await createPost({ title, content });
      present({
        message: "🎉 Post Created!",
        duration: 1500,
        position: "bottom",
        color: "success",
      });
      createPostModal.current?.dismiss();
    } catch (e) {
      console.error(e);
      present({
        message: "😢 Something went wrong...",
        duration: 1500,
        position: "bottom",
        color: "danger",
      });
    }
  };

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const openCreatePostModal = () => {
    if (!user) {
      present({
        message: "🤔 Please sign in to post.",
        duration: 1500,
        position: "bottom",
        color: "warning",
      });

      signInModal.current?.present();

      return;
    }

    createPostModal.current?.present();
  };

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  const signOut = async () => {
    profileModal.current?.dismiss();

    await auth.signOut();

    present({
      message: "👋 Bye bye...",
      duration: 1500,
      position: "bottom",
      color: "success",
    });
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

  const getDisplayName = () => {
    return user?.displayName || user?.email || "Unknown";
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>🧸 Eli's Reddit</IonTitle>
          <IonButtons slot="end">
            {user ? (
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
          <IonFabButton onClick={openCreatePostModal} color="secondary">
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
            <ProfileForm
              username={getDisplayName()}
              onSubmit={onSubmitUpdateProfile}
            />
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
            <SignInForm onSuccess={() => signInModal.current?.dismiss()} />

            <IonText>
              <h4 className="ion-text-center ion-margin">OR</h4>
            </IonText>

            <IonButton expand="block" color="primary" fill="outline">
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
            <PostForm onSubmit={handleCreatePostOnSubmit} />
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
                value={sortBy}
                onIonChange={(e) => setSortBy(e.detail.value)}
              >
                <IonSelectOption value="latestOnTop">
                  Latest on Top
                </IonSelectOption>
                <IonSelectOption value="oldestOnTop">
                  Oldest on Top
                </IonSelectOption>
                <IonSelectOption value="popularOnTop">
                  Most Popular on Top
                </IonSelectOption>
                <IonSelectOption value="unpopularOnTop">
                  Least Popular on Top
                </IonSelectOption>
              </IonSelect>
            </IonListHeader>
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
