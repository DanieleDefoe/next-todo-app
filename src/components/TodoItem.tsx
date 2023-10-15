'use client';

import { prisma } from '@/app/db';
import Link from 'next/link';
import { MouseEvent } from 'react';

export function TodoItem({
  id,
  title,
  complete,
  toggleTodo,
  handleDelete,
}: Todo) {
  return (
    <li className="flex gap-1 items-center justify-between">
      <div className="flex gap-1 items-center">
        <input
          id={id}
          type="checkbox"
          className="cursor-pointer peer"
          defaultChecked={complete}
          onChange={(e) => toggleTodo(id, e.target.checked)}
        />
        <label
          htmlFor={id}
          className="cursor-pointer peer-checked:line-through peer-checked:text-slate-500"
        >
          {title}
        </label>
      </div>
      <div className="flex gap-1 items-center">
        <Link
          href={`/edit/${id}`}
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded-md hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
        >
          Edit
        </Link>
        <button
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded-md hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          onClick={() => handleDelete(id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
