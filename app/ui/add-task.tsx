"use client";

import { createTodo } from "@/app/lib/actions";
import { useFormStatus } from "react-dom";

export default function AddTask() {
  const { pending } = useFormStatus();

  return (
    <form action={createTodo} className="flex items-center">
      <input
        className="flex-grow py-2 px-4 bg-transparent rounded-md bg-white focus:outline-none"
        id="task"
        name="task"
        placeholder="Add a new task..."
      />
      <button
        type="submit"
        className="ml-4 py-2 px-4 rounded-md bg-slate-900 hover:bg-slate-800 text-white"
        aria-disabled={pending}
      >
        Add
      </button>
      <span className="sr-only">Add Todo</span>
    </form>
  );
}
