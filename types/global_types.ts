import { Id } from "@/convex/_generated/dataModel";

export type Path = {
  name: string;
  description: string;
  _id: Id<"paths">;
  _creationTime: number;
};

export type Resource = {
  URL: string;
  level: string;
  time: string;
  freeOrPaid: string;
  price: number;
  _id: Id<"resources">;
  _creationTime: number;
  pathId: Id<"paths">;
};
