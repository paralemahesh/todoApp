import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';

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

const store = createStore(todoApp);

//---------------- ADDITIONAL FUNCTIONS -----------------//

class VisibleTodoList extends React.Component{
  componentDidMount(){
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  getVisibleTodos(){
    let state = store.getState();

    switch(state.visibilityFilter){
      case 'SHOW_ALL':
        return state.todos;
      case 'SHOW_ACTIVE':
        return state.todos.filter((todo) => !todo.completed);
      case 'SHOW_INACTIVE':
        return state.todos.filter((todo) => todo.completed);
      default: return [];
    }
  }

  render(){

    function onTodoClick(id){
      store.dispatch({
        type: 'TOGGLE_TODO',
        id: id
      });
    }

    return(
      <TodoList todos={this.getVisibleTodos()} onTodoClick={onTodoClick}></TodoList>
    );
  };
};

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

const AddTodo = () => {
  let inputText;
  return (
    <div>
      <input ref={input => { inputText = input }}></input>
      <button onClick={() => {
        store.dispatch({
          type: 'ADD_TODO',
          text: inputText.value,
          id: nextTodoId
        });
        inputText.value = '';
      }}>
        Add Todo
      </button>
    </div>
  );
}

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

class TodoFilter extends React.Component{
  componentDidMount(){
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  render(){
    const {filter,children} = this.props;

    function onClick(filter){
      store.dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter
      });
    }

    return (
      <Link filter={filter} active={store.getState().visibilityFilter === filter} onClick={onClick}>{children}</Link>
    )
  }
}

const Footer = currentFilter => {
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

let nextTodoId = 0;
class TodoApp extends React.Component {
  render(){
    return (
      <div style={{marginTop: '100px', textAlign: 'center'}}>
        <AddTodo nextTodoId></AddTodo>
        <VisibleTodoList></VisibleTodoList>
        <Footer currentFilter={visibilityFilter}></Footer>
      </div>
    )
  }
}

const render = () => {
  ReactDOM.render(
    <TodoApp/>,
    document.getElementById('root')
  );
}

store.subscribe(render);

export default render;