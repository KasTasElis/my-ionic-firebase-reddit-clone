import { Timestamp } from "@firebase/firestore";

export const readableDate = (timestamp: Timestamp) => {
  return timestamp.toDate().toISOString();
};
