"use client";

import { X } from "lucide-react";
import { deleteTodo } from "@/app/lib/actions";

export default function DeleteTask({ todoId }: { todoId: number }) {
  return (
    <button
      onClick={async () => {
        await deleteTodo(todoId);
      }}
    >
      <X className="h-4 w-4 text-gray-500 hover:text-gray-900 transition-colors" />
      <span className="sr-only">Delete task</span>
    </button>
  );
}
