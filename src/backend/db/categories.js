import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */


export const categories = [
  {
    _id: uuid(),
    categoryName: "Fiction",
    description:
      "Literature in the form of prose, especially novels, that describes imaginary events and people",
  },
  {
    _id: uuid(),
    categoryName: "Non Fiction",
    description:
      "Non-fiction is writing that gives information or describes real events, rather than telling a story.",
  },
  {
    _id: uuid(),
    categoryName: "Self Help",
    description: "Meant to cause discomfort and fear for both the character and readers.",
  },
];