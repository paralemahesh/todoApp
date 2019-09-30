import React from 'react';
import Todo from '../presentation/Todo.jsx'

const TodoList = ({
  todos,
  onTodoClick
}) => {
  return(
    <ul style={{listStyle: 'none'}}>
      {
        todos.map(todo => <Todo
          key={todo.id}
          id={todo.id}
          text={todo.text}
          completed={todo.completed}
          onClick={onTodoClick}
        ></Todo>)
      }
    </ul>
  );
};

export default TodoList;