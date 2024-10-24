import { OrderByDirection, Timestamp } from "@firebase/firestore";
import { TPost, TSortOptions } from "./types";

export const readableDate = (timestamp: Timestamp) => {
  return timestamp.toDate().toISOString();
};

export const getSortingOptions = (
  sortValue: TSortOptions
): { direction: OrderByDirection; field: keyof TPost } => {
  if (sortValue === "latestOnTop") {
    return {
      field: "createdAt",
      direction: "desc",
    };
  }

  if (sortValue === "oldestOnTop") {
    return {
      field: "createdAt",
      direction: "asc",
    };
  }

  if (sortValue === "popularOnTop") {
    return {
      field: "upVotes",
      direction: "desc",
    };
  }

  return {
    field: "downVotes",
    direction: "desc",
  };
};
