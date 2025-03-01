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
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import "./Home.css";
import { add } from "ionicons/icons";
import { CreatePostModal, ProfileModal, SignInModal } from "../components";
import { auth, db } from "../main";
import { onAuthStateChanged, User } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { TPost, TSortOptions } from "../types";
import { Post } from "../components/Post";
import { getSortingOptions } from "../utils";

const Home = () => {
  const createPostModal = useRef<HTMLIonModalElement>(null);
  const signInModal = useRef<HTMLIonModalElement>(null);
  const profileModal = useRef<HTMLIonModalElement>(null);
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<TPost[] | null>(null);
  const [sortBy, setSortBy] = useState<TSortOptions>("latestOnTop");

  const [present] = useIonToast();

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

        <ProfileModal
          modalRef={profileModal}
          user={user as User}
          setUser={setUser}
          onSignOut={signOut}
        />

        <SignInModal modalRef={signInModal} />

        <CreatePostModal modalRef={createPostModal} />

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

            {posts === null ? (
              <div>Loading...</div>
            ) : posts.length === 0 ? (
              <div>No posts yet...</div>
            ) : (
              posts.map((post) => <Post key={post.id} post={post} />)
            )}
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
