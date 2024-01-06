'use server';

import { supabase } from './db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export interface State {
  errors?: {
    task?: string[] | undefined;
  };
  message?: string | null;
}

const schema = z.object({
  task: z
    .string({ invalid_type_error: 'Please enter a task' })
    .min(3, { message: 'Task must be at least 3 characters.' })
    .max(48, { message: 'Task must be less than 48 characters.' }),
});

export const createTodo = async (prevState: State, formData: FormData) => {
  // Validate form using Zod
  const validatedFields = schema.safeParse({
    task: formData.get('task'),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to add to do.',
    };
  }

  // Prepare data for insertion into the database
  const { task } = validatedFields.data;

  // Insert data into the database
  try {
    await supabase.from('todos').insert({ task });
  } catch (e) {
    console.error('Transaction failed: ', e);
  }

  // Revalidate the cache for the todo page and redirect the user.
  revalidatePath('/');
  redirect('/');
};

export const updateTodo = async (id: number, is_complete: boolean) => {
  // Update data in the database
  try {
    await supabase.from('todos').update({ is_complete }).match({ id: id });
  } catch (e) {
    console.error('Transaction failed: ', e);
  }

  // Revalidate the cache for the todo page and redirect the user.
  revalidatePath('/');
  redirect('/');
};

export const deleteTodo = async (id: number) => {
  // Delete the todo from the database
  try {
    await supabase.from('todos').delete().match({ id: id });
  } catch (e) {
    console.error('Transaction failed: ', e);
  }

  // Revalidate the cache for the todo page and redirect the user.
  revalidatePath('/');
  redirect('/');
};
