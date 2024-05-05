import { query } from "./_generated/server";
import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const getPaths = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("paths").collect();
  },
});

export const createPath = mutation({
  args: { name: v.string(), description: v.string() },
  handler: async (ctx, args) => {
    const newTaskId = await ctx.db.insert("paths", {
      name: args.name,
      description: args.description,
    });
    return newTaskId;
  },
});

export const getPath = query({
  args: { pathId: v.id("paths") },
  handler: async (ctx, args) => {
    const path = await ctx.db.get(args.pathId);
    return path;
  },
});
