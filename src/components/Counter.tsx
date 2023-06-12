import { useDispatch } from 'react-redux';
import CounterInside from './CounterInside.tsx';
import { decrement, increment } from '../store/slice/counterSlice.ts';

export default function Counter() {
  const dispatch = useDispatch();
  return (
    <>
      <br />
      <button onClick={() => dispatch(increment())}>+ click</button>
      <button onClick={() => dispatch(decrement())}>- click</button>
      <CounterInside />
    </>
  );
}
