import { useSelector } from 'react-redux';
import { ReducerType } from '../store/rootReducer.ts';

export default function CounterInside() {
  const count = useSelector((state: ReducerType) => state.counter.value);

  return (
    <>
      <div>{count}</div>
    </>
  );
}
