import { useState } from 'react';

function Num() {
  const [count, setCount] = useState(0);
  
  return (
    <div className='flex flex-col justify-center items-center bg-green-300 w-[80%] m-auto h-[400px]'>
        <p>{count}</p>
    <div className='flex justify-around w-[50%]'>
      <button className='bg-green-500 rounded-md py-[7px] px-[10px]' onClick={() => setCount(c => c + 1)}>+</button>
      <button className='bg-green-500 rounded-md py-[7px] px-[10px]' onClick={() => setCount(0)}>Reset</button>
      <button className='bg-green-500 rounded-md py-[7px] px-[10px]' onClick={() => setCount(c => c - 1)}>-</button>
    </div>
    </div>
  );
}

export default Num;