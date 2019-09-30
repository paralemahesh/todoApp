import {setVisibilityFilter} from '../helpers/todoHelpers.js'
import { connect } from 'react-redux';
import Link from '../presentation/Link.jsx';

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
  
  export default TodoFilter;