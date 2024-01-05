"use server";

import { supabase } from "./db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  task: z.string().min(3, { message: "Task must be at least 3 characters." }),
});

export const createTodo = async (formData: FormData) => {
  // Validate form using Zod
  const parsed = schema.parse({
    task: formData.get("task"),
  });

  // Insert data into the database
  try {
    await supabase.from("todos").insert({ task: parsed.task });

    formData = new FormData();
  } catch (e) {
    console.error("Transaction failed: ", e);
  }

  // Revalidate the cache for the todo page and redirect the user.
  revalidatePath("/");
  redirect("/");
};

export const updateTodo = async (id: number, is_complete: boolean) => {
  // Update data in the database
  try {
    await supabase.from("todos").update({ is_complete }).match({ id: id });
  } catch (e) {
    console.error("Transaction failed: ", e);
  }

  // Revalidate the cache for the todo page and redirect the user.
  revalidatePath("/");
  redirect("/");
};

export const deleteTodo = async (id: number) => {
  // Delete the todo from the database
  try {
    await supabase.from("todos").delete().match({ id: id });
  } catch (e) {
    console.error("Transaction failed: ", e);
  }

  // Revalidate the cache for the todo page and redirect the user.
  revalidatePath("/");
  redirect("/");
};
