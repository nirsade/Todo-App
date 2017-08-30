var React = require('react');
var ReactDOM = require('react-dom');
var {hashHistory } = require('react-router');
var { Provider } = require('react-redux');
import router from 'app/router/'

import TodoApp from 'TodoApp';
var actions = require('actions');
var store = require('configureStore').configure();
import Login from 'Login';
import firebase from 'app/firebase'

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(actions.login(user.uid));
    hashHistory.push('/todos');
  } else {
    store.dispatch(actions.logout());
    hashHistory.push('/');
  }
});

store.dispatch(actions.startAddTodos());

// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')

ReactDOM.render(
  <Provider store={store}>
    {router}
  </Provider>,
  document.getElementById('app')
);
