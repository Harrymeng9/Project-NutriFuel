import React from 'react';

export default function TextBox ({defaultText}){

  return (
  <div className="TextBox">
    <input type="text" placeholder={defaultText}></input>
  </div>);
};