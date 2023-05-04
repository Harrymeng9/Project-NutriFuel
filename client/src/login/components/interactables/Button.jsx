import React from 'react';

export default function Button ({text}){


  return (
    <input type="button" className="Button" value={text} onClick={()=>{console.log('hello')}}></input>
  )
};