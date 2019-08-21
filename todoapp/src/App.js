import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';

//---------------- REDUCERS -----------------//

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

const todoApp = combineReducers({
  todos,
  visibilityFilter
})

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

//---------------- ADDITIONAL FUNCTIONS -----------------//
let nextTodoId = 0;
const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  }
}

const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}

const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}

const getVisibleTodos = (todos, visibilityFilter) => {

  switch(visibilityFilter){
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_ACTIVE':
      return todos.filter((todo) => !todo.completed);
    case 'SHOW_INACTIVE':
      return todos.filter((todo) => todo.completed);
    default: return [];
  }
}

//**---------------- COMPONENTS -----------------***//

//---------------- PRESENTATIONAL COMPONENTS -----------------//

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


const Footer = () => {
  return (
    <div>
      Show : 
      <TodoFilter filter='SHOW_ALL'>All</TodoFilter> {' '}
      <TodoFilter filter='SHOW_ACTIVE'>Active</TodoFilter> {' '}
      <TodoFilter filter='SHOW_INACTIVE'>Inactive</TodoFilter> {' '}
    </div>
  )
}

//---------------- CONTAINER COMPONENTS -----------------//

const TodoApp = () => (
  <div style={{marginTop: '100px', textAlign: 'center'}}>
    <AddTodo></AddTodo>
    <VisibleTodoList></VisibleTodoList>
    <Footer></Footer>
  </div>
)

const render = ()=> ReactDOM.render(
  <Provider store={createStore(todoApp)}>
    <TodoApp/>
  </Provider>,
  document.getElementById('root')
);

//----------------- Connected components -----------------//

let AddTodo = ({dispatch}) => {

  let inputText;
  return (
    <div>
      <input ref={input => { inputText = input }}></input>
      <button onClick={() => {
        dispatch(addTodo(inputText.value));
        inputText.value = '';
      }}>
        Add Todo
      </button>
    </div>
  );
}
AddTodo = connect()(AddTodo)

//--------------- VisibleTodoList -> TodoList --------------------//

const mapStateToProps = (state) =>{
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }
  }
};

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

//--------------- TodoFilter -> Link --------------------//

const mapTodoFilterStateToProps = (state, ownProps) => {
  return {
    filter: ownProps.filter,
    active: state.visibilityFilter === ownProps.filter,
    children: ownProps.children
  }
}

const mapTodoDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {dispatch(setVisibilityFilter(ownProps.filter))}
  }
}

const TodoFilter = connect(
  mapTodoFilterStateToProps,
  mapTodoDispatchToProps  
)(Link)



export default render;