import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function QueryTest() {
  const { data } = useQuery({
    queryKey: ['todo'],
    queryFn: async () => {
      return await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    },
  });
  console.log(data);
  return (
    <>
      <div>QueryTest</div>
      <span>{data?.data.title}</span>
    </>
  );
}
