import { useState } from 'react';

export default function Counter() {
  const [value, setValue] = useState(0);

  return (
    <>
      test {value}
      <br />
      <button onClick={() => setValue(v => v + 1)}>click</button>
    </>
  );
}
