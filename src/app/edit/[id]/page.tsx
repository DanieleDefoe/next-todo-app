import { prisma } from '@/app/db';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

interface Params {
  params: {
    id: string;
  };
}

function findTodo(id: string) {
  return prisma.todo.findFirst({ where: { id } });
}

async function updateTodo(data: FormData, id: string) {
  'use server';

  const title = data.get('title')?.valueOf();

  if (typeof title !== 'string' || title.length === 0) {
    throw new Error('Invalid title');
  }

  await prisma.todo.update({ where: { id }, data: { title } });

  redirect('/');
}

export async function generateMetadata({
  params: { id },
}: Params): Promise<Metadata> {
  const todo = await prisma.todo.findFirst({ where: { id } });

  if (!todo) {
    return {
      title: 'Todo Not Found',
    };
  }

  return {
    title: todo.title,
  };
}

export default async function EditTodo({ params: { id } }: Params) {
  const todo = await findTodo(id);

  if (!todo) {
    return notFound();
  }

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Update todo</h1>
      </header>
      <form
        className="flex gap-2 flex-col"
        action={async (data) => {
          'use server';
          await updateTodo(data, id);
        }}
      >
        <input
          type="text"
          name="title"
          defaultValue={todo.title}
          className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
        />
        <div className="flex gap-1 justify-end">
          <Link
            href=".."
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded-md hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="border border-slate-300 text-slate-300 px-2 py-1 rounded-md hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          >
            Update
          </button>
        </div>
      </form>
    </>
  );
}
