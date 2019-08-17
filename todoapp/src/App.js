import React from 'react';
import ReactDOM from 'react-dom';
import { createStore} from 'redux';


const visibilityFilter = (
  state = 'SHOW_ALL',
  action
) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
}

const todos = (state = [], action) => {
  switch (action.type){
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key](
          state[key],
          action
        );
        return nextState;
      },
      {}
    );
  };
};

const todoApp = combineReducers({
  todos,
  visibilityFilter
})

const store = createStore(todoApp);

const todo = (state, action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if(state.id !== action.id) {
        return state;
      }

    return {
      ...state,
      completed: !state.completed
    };
    default:
      return state;
  }
};

let nextTodoId = 0;
class TodoApp extends React.Component {
  render(){
    return (
      <div>
        <button onClick={() => {
          store.dispatch({
            type: 'ADD_TODO',
            text: 'Test',
            id: nextTodoId++
          });
        }}>
          Add Todo
        </button>
        <ul>
          {this.props.todos.map(todo =>
            <li key={todo.id}>
              {todo.text}
            </li>
          )}
        </ul>
      </div>
    )
  }
}

const render = () => {
  ReactDOM.render(
    <TodoApp
      todos={store.getState().todos}
    />,
    document.getElementById('root')
  );
}


console.log('Initial state');
console.log(store.getState());
console.log('----------');

console.log('Dispatching add todo.');

store.subscribe(render);
// render();


export default render;