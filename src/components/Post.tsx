import { IonChip, IonItem, IonLabel, IonNote } from "@ionic/react";
import "./Post.css";
import { TPost } from "../types";
import { readableDate } from "../utils";

export const Post = ({ post }: { post: TPost }) => {
  return (
    <IonItem
      id="message-list-item"
      routerLink={`/message/${post.id}`}
      detail={false}
    >
      <IonLabel className="ion-text-wrap">
        <div className="title">
          <h3>🤖 {post.userName}</h3>
          <span className="date">
            <IonNote>{readableDate(post.createdAt)}</IonNote>
          </span>
        </div>

        <h2>{post.title}</h2>

        <p>
          {post.content.length > 100
            ? post.content.substring(0, 100) + "..."
            : post.content}
        </p>

        <div className="ion-padding-top">
          <IonChip color="primary">💬 {post.commentCount} Comments</IonChip>
          <IonChip color="success">⬆️ {post.upVotes}</IonChip>
          <IonChip color="danger">⬇️ {post.downVotes}</IonChip>
        </div>
      </IonLabel>
    </IonItem>
  );
};
