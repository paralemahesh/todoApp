import React from 'react';
import TodoFilter from '../container/TodoFilter.jsx';

const Footer = () => {
    return (
      <div>
        Show : 
        <TodoFilter filter='SHOW_ALL'>All</TodoFilter> {' '}
        <TodoFilter filter='SHOW_ACTIVE'>Active</TodoFilter> {' '}
        <TodoFilter filter='SHOW_INACTIVE'>Inactive</TodoFilter> {' '}
      </div>
    )
  };

  export default Footer;