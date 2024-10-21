import React from 'react'
import './counter.css'
import NumList from './NumList';
export default function NoCounter(props) {
  const numArray = Array.isArray(props.num) ? props.num : [];
  return (
    <div className='numbox'>
      {numArray.map((num, index) => (
        <NumList key={index} num={num} />
      ))}
    </div>
  );
}
