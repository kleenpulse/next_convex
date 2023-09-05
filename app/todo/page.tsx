"use client";

import { useState, useRef, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Typewriter from "typewriter-effect";

import DeleteIcon from "@/components/icons/DeleteIcon";
import EditIcon from "@/components/icons/Edit";
import TaskIcon from "@/components/icons/TaskIcon";
import CheckIcon from "@/components/icons/CheckIcon";
import Checked from "@/components/icons/Checked";

import CompletedTasks from "@/components/CompletedTasks";
import { Tooltip } from "@nextui-org/tooltip";

export default function TodoPage() {
	const [text, setText] = useState<string>("");
	const [isDone, setIsDone] = useState<boolean>(false);
	const [gradient, setGradient] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	// API Calls
	const createTodo = useMutation(api.todos.createTodo);
	const todos = useQuery(api.todos.getTodos);
	const delTask = useMutation(api.todos.deleteTodo);
	const doneTask = useMutation(api.todos.doneTodo);
	const doneTodos = useQuery(api.todos.getDoneTodos);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// call the mutation here
		createTodo({ text });

		setText("");
	};
	// convert unix timestamp to date
	const formatDate = (date: number) => {
		return new Date(date).toLocaleString();
	};

	useEffect(() => {
		if (!todos || todos.length < 1) {
			setGradient(false);
		} else {
			setGradient(true);
		}
	}, [todos]);

	useEffect(() => {
		if (!doneTodos || !(doneTodos.length > 0)) {
			setIsDone(false);
		}
	}, [doneTodos]);

	return (
		<section
			className={`flex min-h-screen flex-col items-center justify-evenly lg:p-24 sm:p-10 pt-10 w-full bg-gray-900 text-gray-100 min-w-[360px] relative max-w-[1440px] ${
				gradient ? "todo-section" : ""
			}`}
		>
			<div className="flex justify-between items-center left-0  px-4 top-0 py-4  w-full fixed z-20 backdrop-blur-lg ">
				<Tooltip
					content="Show Completed Task"
					placement="right-end"
					className="text-gray-100 bg-cyan-800 rounded-lg"
				>
					<button
						className={`${
							doneTodos && !(doneTodos.length > 0) ? "hidden" : ""
						}`}
						disabled={doneTodos && !(doneTodos.length > 0)}
						onClick={() => {
							setGradient(false);
							setIsDone((prev) => !prev);
						}}
					>
						<Checked />
					</button>
				</Tooltip>

				<h1 className="text-3xl font-bold  sm:uppercase">Todo List</h1>

				<p>
					{todos && todos.length <= 1 ? "Task" : "Tasks"}: {todos?.length}
				</p>
			</div>
			<div className="flex items-start flex-col gap-4 w-full max-w-3xl sm:text-xl lg:text-2xl ">
				{!todos || todos.length < 1 ? (
					<div className="w-full  flex justify-center relative ">
						<p className="sm:text-[55px] text-2xl uppercase font-black  null-nothing sm:py-6 px-0 sm:leading-[120%] text-center xl:text-[90px] ">
							<Typewriter
								options={{
									strings: [
										"nothing to see here",
										"If it appears to be an error",
										"Try refreshing the page :)",
										"Else add a task!",
									],
									autoStart: true,
									loop: true,
								}}
							/>
						</p>
					</div>
				) : (
					<div className="sm:pb-12 pb-16 my-auto w-full max-sm:my-12 overflow-auto max-sm:mb-32 z-10 backdrop-blur-lg sm:h-[700px]">
						{todos?.map((todo: any) => (
							<div
								key={todo._id}
								className="flex max-sm:flex-col justify-center sm:justify-between hover:bg-gray-900  sm:hover:bg-white/10 p-4 transition duration-300 max-sm:border-y-slate-500 border-y-[1px]"
							>
								<div className="flex gap-4">
									<div>
										<TaskIcon />
									</div>

									<li className="break-words whitespace-pre-wrap list-none mr-4">
										{todo.text}
										<br />
										<span className="text-xs text-gray-400 ">
											{formatDate(todo._creationTime)}
										</span>
									</li>
								</div>
								<div className="flex justify-end sm:justify-between gap-4 sm:gap-2 max-sm:mt-2">
									<button
										onClick={() => {
											doneTask({ taskId: todo._id });
										}}
										title="Done"
									>
										<CheckIcon />
									</button>
									<button
										onClick={() => {
											setText(todo.text);
											delTask({ taskId: todo._id });
											inputRef.current?.focus();
										}}
										title="Edit"
									>
										<EditIcon />
									</button>
									<button
										onClick={() => {
											delTask({ taskId: todo._id });
										}}
										title="Delete"
									>
										<DeleteIcon />
									</button>
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			<form
				onSubmit={handleSubmit}
				className="w-full  flex justify-center fixed bottom-0 z-10 backdrop-blur-lg py-4"
			>
				<div className="flex max-sm:justify-center  gap-4 w-full max-w-3xl px-2 pb-4 max-sm:flex-col">
					<input
						ref={inputRef}
						className="text-white border border-cyan-400 p-2 py-4 bg-transparent sm:w-[80%] w-full outline-none rounded-xl"
						placeholder="What needs to be done?"
						value={text}
						onChange={(e) => {
							setText(e.target.value);
						}}
					/>
					<button
						type="submit"
						className={`border border-cyan-400 p-2 rounded-xl ${
							!text && "opacity-50 cursor-not-allowed"
						}`}
						disabled={!text}
					>
						{todos && todos.length > 0 ? "Add Task" : "Create Task"}
					</button>
				</div>
			</form>

			{isDone && (
				<div>
					<div
						onClick={() => {
							setGradient(true);
							setIsDone(false);
						}}
						className="fixed w-full min-h-screen bg-[#0000007b] z-20 top-0 left-0 backdrop-blur-sm"
					/>
					<CompletedTasks setIsDone={setIsDone} isGradient={setGradient} />
				</div>
			)}
			{doneTodos && doneTodos.length > 0 && (
				<div
					onClick={() => {
						setGradient(false);
						setIsDone(true);
					}}
					className="max-lg:hidden fixed bottom-[10%] xl:bottom-10 z-40 right-4 cursor-pointer animate-slideUpBounce"
				>
					<p className="p-2 bg-gray-800 rounded-2xl">
						{doneTodos?.length} {doneTodos?.length <= 1 ? "Task" : "Tasks"}{" "}
						Completed
					</p>
				</div>
			)}
		</section>
	);
}
