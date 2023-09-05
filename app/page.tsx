"use client";

import Link from "next/link";

export default function Home() {
	return (
		<main className="flex min-h-screen items-center justify-center p-12 w-full">
			<nav>
				<Link
					href="/todo"
					className="bg-green-400 text-black p-2 text-[20px] sm:text-4xl uppercase font-bold rounded-xl todo-section"
				>
					Todo app
				</Link>
			</nav>
		</main>
	);
}
