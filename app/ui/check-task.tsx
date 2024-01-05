"use client";

import { updateTodo } from "@/app/lib/actions";
import { Checkbox } from "./checkbox";

interface IsCompleteProps {
  todo: {
    id: number;
    is_complete: boolean;
  };
}

export default function TaskCheckbox({ todo }: IsCompleteProps) {
  return (
    <Checkbox
      checked={todo.is_complete}
      onClick={async () => {
        await updateTodo(todo.id, !todo.is_complete);
      }}
    />
  );
}
