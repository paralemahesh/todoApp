import './index.css';
import render from './App';
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<TodoApp todos={store.getState().todos} />, document.getElementById('root'));
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
