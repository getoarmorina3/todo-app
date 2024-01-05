import CheckTask from "./check-task";
import DeleteTask from "./delete-todo";
import clsx from "clsx";

export interface ToDosListProps {
  todos: Array<{
    id: number;
    task: string;
    is_complete: boolean;
  }>;
}

export default function ToDosList({ todos }: ToDosListProps) {
  return (
    <ul className="mt-8 space-y-4">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-center justify-between bg-white rounded-lg p-4"
        >
          <div className="flex items-center space-x-4">
            <CheckTask todo={todo} />
            <label
              className={clsx("block text-gray-900", {
                "line-through text-gray-900/50": todo.is_complete,
              })}
            >
              {todo.task}
            </label>
          </div>
          <DeleteTask todoId={todo.id} />
        </li>
      ))}
    </ul>
  );
}
