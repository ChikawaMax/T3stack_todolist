"use client";

import { api } from "~/trpc/react";
import { useState } from "react";

export default function Home() {
  const { data: todos, refetch } = api.todo.getAll.useQuery();
  const addTodo = api.todo.add.useMutation({ onSuccess: () => refetch() });
  const toggleTodo = api.todo.toggle.useMutation({
    onSuccess: () => refetch(),
  });
  const deleteTodo = api.todo.delete.useMutation({
    onSuccess: () => refetch(),
  });

  const [title, setTitle] = useState("");

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="mb-4 text-2xl font-bold">📝 ToDo App</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!title) return;
          addTodo.mutate({ title });
          setTitle("");
        }}
        className="mb-6 flex gap-2"
      >
        <input
          className="flex-1 border p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task..."
        />
        <button className="rounded bg-blue-500 px-4 py-2 text-white">
          Add
        </button>
      </form>

      <ul className="space-y-2">
        {todos?.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between rounded border p-2"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() =>
                  toggleTodo.mutate({ id: todo.id, completed: !todo.completed })
                }
              />
              <span
                className={todo.completed ? "text-gray-500 line-through" : ""}
              >
                {todo.title}
              </span>
            </div>
            <button
              onClick={() => deleteTodo.mutate({ id: todo.id })}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
