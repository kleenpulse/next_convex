"use client";

import { useState, useRef, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import DeleteIcon from "@/components/icons/DeleteIcon";

import TaskIcon from "@/components/icons/TaskIcon";

import CloseIcon from "./icons/CloseIcon";
import { Tooltip } from "@nextui-org/tooltip";

export default function CompletedTasks({ setIsDone, isGradient }: any) {
	const doneTodos = useQuery(api.todos.getDoneTodos);
	const delTask = useMutation(api.todos.deleteTodo);

	// convert unix timestamp to date
	const formatDate = (date: number) => {
		return new Date(date).toLocaleString();
	};

	return (
		<div className="max-sm:backdrop-blur-xl sm:bg-gray-900 top-0 right-0 z-50 w-[90%] sm:w-[80%] xl:w-[50%] fixed h-screen overflow-hidden animate-slideIn todo-section">
			<div className="flex flex-col px-4 gap-4 w-full sm:text-xl lg:text-2xl  h-full sm:pt-12 pt-4">
				<div className="flex justify-between items-center px-4  w-full relative  backdrop-blur-lg">
					<Tooltip
						content="Close"
						placement="right-end"
						className="text-gray-100 bg-cyan-800 rounded-lg"
					>
						<button
							onClick={() => {
								isGradient(true);
								setIsDone(false);
							}}
						>
							<CloseIcon />
						</button>
					</Tooltip>

					<h1 className="sm:text-3xl text-sm font-bold  sm:uppercase">
						Completed {doneTodos && doneTodos.length <= 1 ? "Task" : "Tasks"} :{" "}
						{doneTodos?.length}
					</h1>

					<p className="text-sm"></p>
				</div>
				<div className="sm:pb-12 pb-16  w-full mt-4 sm:mt-7 overflow-y-scroll h-full">
					{doneTodos?.map((todo: any) => (
						<div
							key={todo._id}
							className="flex max-sm:flex-col justify-center sm:justify-between  hover:bg-white/10 p-4 transition duration-300 max-sm:border-y-slate-500 border-y-[1px]"
						>
							<div className="flex gap-4">
								<div>
									<TaskIcon />
								</div>

								<li className="break-words whitespace-pre-wrap list-none mr-4 max-sm:text-sm">
									{todo.text}
									<br />
									<span className="text-xs text-gray-600 ">
										{formatDate(todo._creationTime)}
									</span>
								</li>
							</div>
							<div className="flex justify-end relative z-50">
								<Tooltip
									content="Delete"
									placement="top"
									offset={-10}
									className="text-gray-100 bg-red-600 rounded-lg"
								>
									<button
										onClick={() => {
											delTask({ taskId: todo._id });
										}}
										className="sm:scale-[1.6] scale-125"
									>
										<DeleteIcon />
									</button>
								</Tooltip>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
