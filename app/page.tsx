"use client";

import Link from "next/link";

export default function Home() {
	return (
		<main className="flex min-h-screen items-center justify-between p-12 w-full">
			<nav>
				<Link
					href="/todo"
					className="bg-green-400 text-black p-2 text-[20px] rounded-xl"
				>
					Todo
				</Link>
			</nav>
		</main>
	);
}
