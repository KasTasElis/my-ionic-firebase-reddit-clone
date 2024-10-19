import { IonChip, IonIcon, IonItem, IonLabel, IonNote } from "@ionic/react";
import { Message } from "../data/messages";
import "./MessageListItem.css";
import { closeCircle } from "ionicons/icons";

interface MessageListItemProps {
  message: Message;
}

const MessageListItem: React.FC<MessageListItemProps> = ({ message }) => {
  return (
    <IonItem
      id="message-list-item"
      routerLink={`/message/${message.id}`}
      detail={false}
    >
      <IonLabel className="ion-text-wrap">
        <div className="title">
          <h3>🤖 {message.fromName}</h3>
          <span className="date">
            <IonNote>{message.date}</IonNote>
          </span>
        </div>

        <h2>{message.subject}</h2>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <div className="ion-padding-top">
          <IonChip color="primary">💬 7 Comments</IonChip>
          <IonChip color="success">⬆️ 3</IonChip>
          <IonChip color="danger">⬇️ 0</IonChip>
        </div>
      </IonLabel>
    </IonItem>
  );
};

export default MessageListItem;
