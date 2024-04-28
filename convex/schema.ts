import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  paths: defineTable({
    name: v.string(),
    description: v.string(),
  }),
  resources: defineTable({
    URL: v.string(),
    level: v.string(),
    time: v.string(),
    freeOrPaid: v.string(),
    price: v.optional(v.number()),
    pathId: v.id("paths"),
  }),
});
