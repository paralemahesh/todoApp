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

export {getVisibleTodos, setVisibilityFilter, toggleTodo, addTodo};