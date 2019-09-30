import React from 'react';

const Link = ({
    filter,
    active,
    onClick,
    children
  }) => {
    
    if(active){
      return (
        <span>{children}</span>
      )
    }
    return (
      <button onClick={(e) => {
        e.preventDefault();
        onClick(filter)
      }}>{children}</button>
    );
  };

export default Link;