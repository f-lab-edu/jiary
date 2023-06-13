import { useQueryTodo } from '@/core/hooks/query/useQueryTodo.ts';

export default function QueryTest() {
  const { todo, isError } = useQueryTodo();

  return (
    <>
      {isError && <p>error</p>}
      <div>QueryTest</div>
      <span>{todo?.title}</span>
    </>
  );
}
