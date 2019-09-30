import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../helpers/todoHelpers.js'

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

  export default AddTodo;