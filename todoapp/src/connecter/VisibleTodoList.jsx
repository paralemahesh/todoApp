import { connect } from 'react-redux';
import TodoList from '../container/TodoList.jsx';
import { getVisibleTodos, toggleTodo } from '../helpers/todoHelpers.js';

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
  
export default VisibleTodoList;