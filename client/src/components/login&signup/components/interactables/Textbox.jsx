import React from 'react';

export default function TextBox ({defaultText, isPassword, onChange}){

  // return (
  // <div className="TextBox">
  //   <input type="text" placeholder={defaultText}></input>
  // </div>);

  if (isPassword) {
    return (
      <input type="password" className="TextBox" placeholder={defaultText} onChange={onChange}></input>
    );
  }
  return (
    <input type="text" className="TextBox" placeholder={defaultText} onChange={onChange}></input>
  );

};