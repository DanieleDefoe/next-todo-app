import Link from 'next/link';
import { prisma } from './db';
import { TodoItem } from '@/components/TodoItem';
import { MouseEvent } from 'react';
import { revalidatePath } from 'next/cache';

function getTodos() {
  return prisma.todo.findMany();
}

async function toggleTodo(id: string, checked: boolean) {
  'use server';

  await prisma.todo.update({ where: { id }, data: { complete: checked } });
}

async function handleDelete(id: string) {
  'use server';
  console.log(id);
  await prisma.todo.delete({ where: { id } });
  revalidatePath('/');
}

export default async function Home() {
  const todos = await getTodos();

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Todos</h1>
        <Link
          href="/new"
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded-md hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
        >
          New
        </Link>
      </header>
      <ul className="gap-4 flex flex-col">
        {Boolean(todos.length) ? (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              {...todo}
              toggleTodo={toggleTodo}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <h3 className="text-center text-2xl">No todos here yet...</h3>
        )}
      </ul>
    </>
  );
}
