import React from 'react';

const Todo = ({
    id,
    text,
    completed,
    onClick
  }) => {
    return (
      <li
        onClick={() => { onClick(id)}}
        style={{textDecoration: completed ? 'line-through':'none'}}
      >
        {text}
      </li>
  )};

export default Todo;