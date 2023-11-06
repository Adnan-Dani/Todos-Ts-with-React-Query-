import { QueryClient, useMutation } from "@tanstack/react-query";
import { CACHE_KEY_TODOS } from "../constants";
import todoService, { Todo } from "../services/todoService";

interface AddToContext {
  previousData: Todo[];
}

const useAddTodo = (onAdd: () => void) => {
  const queryClient = new QueryClient();
  return useMutation<Todo, Error, Todo, AddToContext>({
    mutationFn: todoService.post,
    onMutate: (newTodo: Todo) => {
      const previousData =
        queryClient.getQueryData<Todo[]>(CACHE_KEY_TODOS) || [];

      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos = []) => [
        newTodo,
        ...todos,
      ]);
      onAdd();
      return { previousData };
    },

    onSuccess: (saveTodo, newTodo) => {
      queryClient.setQueryData<Todo[]>(CACHE_KEY_TODOS, (todos) =>
        todos?.map((todo) => (todo === newTodo ? saveTodo : todo))
      );
    },

    onError: (error, variables, context) => {
      if (!context) return null;
      queryClient.setQueryData(CACHE_KEY_TODOS, context.previousData);
    },
  });
};

export default useAddTodo;
