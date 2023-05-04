import React from 'react';

export default function TextBox ({defaultText, password}){

  // return (
  // <div className="TextBox">
  //   <input type="text" placeholder={defaultText}></input>
  // </div>);

  if (password) {
    return (
      <input type="password" className="TextBox" placeholder={defaultText}></input>
    );
  }
  return (
    <input type="text" className="TextBox" placeholder={defaultText}></input>
  );

};