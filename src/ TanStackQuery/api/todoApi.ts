import apiClient from './apiClient';

export interface Todo {
  userId?: number;
  id: string; // Using string to handle local random ids as well as numerical ones
  title: string;
  completed: boolean;
}

export const fetchTodos = async ({
  pageParam = 0,
}: {
  pageParam?: number;
}): Promise<Todo[]> => {
  // Use skip and limit for pagination (10 per page)
  const { data } = await apiClient.get(`/todos?limit=10&skip=${pageParam}`);
  // dummyjson returns an object `{ todos: [...], total, skip, limit }`
  return data.todos.map((item: any) => ({
    userId: item.userId,
    id: String(item.id),
    title: item.todo, // Mapping dummyjson's 'todo' to our 'title'
    completed: item.completed,
  }));
};

export const getTodosByUser = async (
  userId: string | number,
): Promise<Todo[]> => {
  const { data } = await apiClient.get(`/todos/user/${userId}`);
  return data.todos.map((item: any) => ({
    userId: item.userId,
    id: String(item.id),
    title: item.todo,
    completed: item.completed,
  }));
};

export const createTodo = async (newTodo: {
  title: string;
  completed: boolean;
  userId?: number;
}): Promise<Todo> => {
  // dummyjson expects 'todo' instead of 'title', and requires a 'userId'
  const payload = {
    todo: newTodo.title,
    completed: newTodo.completed,
    userId: newTodo.userId || 5, // Just hardcode to 5 for mock
  };
  const { data } = await apiClient.post('/todos/add', payload);
  return {
    userId: data.userId,
    id: String(data.id || Date.now()),
    title: data.todo,
    completed: data.completed,
  };
};

export const updateTodo = async (
  id: string,
  updates: Partial<{ title: string; completed: boolean }>,
): Promise<Todo> => {
  const payload: any = {};
  if (updates.title !== undefined) payload.todo = updates.title;
  if (updates.completed !== undefined) payload.completed = updates.completed;

  // Artificial delay so you can see the sweet loading spinner!
  await new Promise(resolve => setTimeout(() => resolve(undefined), 2000));

  const { data } = await apiClient.put(`/todos/${id}`, payload);
  return {
    userId: data?.userId,
    id: String(data?.id),
    title: data?.todo,
    completed: data?.completed,
  };
};

export const deleteTodo = async (id: string): Promise<void> => {
  await apiClient.delete(`/todos/${id}`);
};
