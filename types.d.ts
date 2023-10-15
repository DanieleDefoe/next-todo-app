interface Todo {
  title: string;
  id: string;
  complete: boolean;
  toggleTodo(id: string, checked: boolean): void;
  handleDelete(id: string): void;
}
