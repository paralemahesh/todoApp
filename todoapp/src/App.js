import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import TodoApp from './container/TodoApp.jsx';
import { todoApp } from './reducers/reducers.js';

const render = ()=> ReactDOM.render(
  <Provider store={createStore(todoApp)}>
    <TodoApp/>
  </Provider>,
  document.getElementById('root')
);

export default render;