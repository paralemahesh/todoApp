import React from 'react';
import AddTodo from '../connecter/AddTodo.jsx';
import VisibleTodoList from '../connecter/VisibleTodoList.jsx';
import Footer from '../presentation/Footer.jsx';

const TodoApp = () => (
    <div style={{marginTop: '100px', textAlign: 'center'}}>
      <AddTodo></AddTodo>
      <VisibleTodoList></VisibleTodoList>
      <Footer></Footer>
    </div>
  );

export default TodoApp;