import { useQuery } from '@tanstack/react-query';
import { fetchTodo } from '@/core/apis/todo.ts';

const QUERY_KEY = 'todo';

export const useQueryTodo = () => {
  const response = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: fetchTodo,
  });

  return { ...response, todo: response.data?.data };
};
