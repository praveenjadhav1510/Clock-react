import React from 'react';

export default function NumList(props) {
  const numbers = Array.from({ length: 10 }, (_, i) => i); // Create an array [0, 1, 2, ..., 9]

  return (
    <div className='integer'>
      {numbers.map(num => (
        <div key={num} style={{ top: `-${props.num * 60}px` }}>
          {num}
        </div>
      ))}
    </div>
  );
}
