import { query } from "./_generated/server";
import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const getResources = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("resources").collect();
  },
});

export const createResource = mutation({
  args: {
    URL: v.string(),
    level: v.string(),
    time: v.string(),
    freeOrPaid: v.string(),
    pathId: v.id("paths"),
    price: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const newResourceId = await ctx.db.insert("resources", args);
    return newResourceId;
  },
});

export const getPathResources = query({
  args: { pathId: v.id("paths") },
  handler: async ({ db }, args) => {
    const pathResources = await db
      .query("resources")
      .filter((q) => {
        return q.eq(q.field("pathId"), args.pathId);
      })
      .order("desc")
      .collect();

    return pathResources;
  },
});
