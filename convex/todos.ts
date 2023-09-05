import { action, mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

export const createTodo = mutation({
	args: {
		text: v.string(),
	},
	handler: async (ctx, args) => {
		await ctx.db.insert("todos", { text: args.text, done: false });
	},
});

export const getTodos = query({
	handler: async (ctx) => {
		return ctx.db
			.query("todos")
			.filter((q) => q.eq(q.field("done"), false))
			.collect();
	},
});

// Get completed tasks
export const getDoneTodos = query({
	handler: async (ctx) => {
		return ctx.db
			.query("todos")
			.filter((q) => q.eq(q.field("done"), true))
			.collect();
	},
});

export const deleteTodo = mutation({
	args: {
		taskId: v.id("todos"),
	},
	handler: async (ctx, args) => {
		await ctx.db.delete(args.taskId);
	},
});

export const doneTodo = mutation({
	args: {
		taskId: v.id("todos"),
	},
	handler: async (ctx, args) => {
		await ctx.db.patch(args.taskId, { done: true });
	},
});
