import { AbstractApi } from "./AbstractApi";

export interface TodoListItemData {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

export class TodoApi extends AbstractApi {
  async fetchTodos() {
    const url = "/todos";
    return this.request<TodoListItemData[]>("get", url, null);
  }

  async createTodo(name: string) {
    const url = "/todos";
    const body = {
      todo: name,
    };
    return this.request<TodoListItemData>("get", url, body);
  }

  async updateTodo({ id, todo, isCompleted }: TodoListItemData) {
    const url = `/todos/${id}`;
    const body = {
      todo,
      isCompleted,
    };
    return this.request<TodoListItemData>("put", url, body);
  }

  async deleteTodo(id: number) {
    const url = `/todos/${id}`;
    await this.request("delete", url, null);
  }
}
