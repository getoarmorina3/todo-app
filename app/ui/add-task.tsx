'use client';

import { State, createTodo } from '@/app/lib/actions';
import clsx from 'clsx';
import { useFormStatus, useFormState } from 'react-dom';

export default function AddTask() {
  let initialState: State = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createTodo, initialState);
  const { pending } = useFormStatus();

  const isError = state?.errors?.task && state.errors.task.length > 0;

  return (
    <>
      <form action={dispatch} className="flex items-center">
        <input
          className={clsx(
            'flex-grow py-2 px-4 bg-transparent rounded-md bg-white focus:outline-none',
            {
              'border border-red-500': isError,
            }
          )}
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
      {isError && (
        <div
          id="task-error"
          aria-live="polite"
          className="my-2 pl-3 text-sm text-red-500"
        >
          {state.errors?.task?.map((error: string) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}
    </>
  );
}
