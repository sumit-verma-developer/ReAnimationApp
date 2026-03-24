import {
  useQuery,
  useMutation,
  useQueryClient,
  InfiniteData,
  useInfiniteQuery,
} from '@tanstack/react-query';
import {
  fetchTodos,
  createTodo,
  deleteTodo,
  updateTodo,
  Todo,
} from '../api/todoApi';

export const useTodos = () => {
  return useInfiniteQuery({
    queryKey: ['todos'],
    queryFn: ({ pageParam = 0 }) => fetchTodos({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: any, allPages: any) => {
      // dummyjson limit is 10
      return lastPage.length === 10 ? allPages.length * 10 : undefined;
    },
  });
};

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    onSuccess: newTodo => {
      queryClient.setQueryData(
        ['todos'],
        (oldData: InfiniteData<Todo[]> | undefined) => {
          if (!oldData) return oldData;
          const newPages = [...oldData.pages];
          if (newPages.length > 0) {
            newPages[0] = [newTodo, ...newPages[0]];
          }
          return { ...oldData, pages: newPages };
        },
      );
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData(
        ['todos'],
        (oldData: InfiniteData<Todo[]> | undefined) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map(page =>
              page.filter(todo => todo.id !== deletedId),
            ),
          };
        },
      );
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<{ title: string; completed: boolean }>;
    }) => updateTodo(id, updates),
    onSuccess: updatedTodo => {
      queryClient.setQueryData(
        ['todos'],
        (oldData: InfiniteData<Todo[]> | undefined) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map(page =>
              page.map(todo =>
                todo.id === updatedTodo.id ? updatedTodo : todo,
              ),
            ),
          };
        },
      );
    },
  });
};
