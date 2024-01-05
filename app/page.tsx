import { supabase } from "./lib/db";
import AddTask from "./ui/add-task";
import ToDosList from "./ui/todo-list";

export default async function Page() {
  const { data: todos } = await supabase
    .from("todos")
    .select("*")
    .order("is_complete");

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-slate-100">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800">To Do List</h1>
      </header>
      <div className="w-full max-w-md mx-auto">
        <AddTask />
        {todos && todos.length > 0 ? (
          <ToDosList todos={todos} />
        ) : (
          <p className="mt-8 text-center">
            Your to-do list is currently empty. <br /> Add a task above to get
            started.
          </p>
        )}
      </div>
    </main>
  );
}
