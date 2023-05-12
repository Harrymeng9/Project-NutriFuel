import React from 'react';

export default function Button ({text, onClick}){


  return (
    <input type="button" className="Button" value={text} onClick={onClick}></input>
  )
};