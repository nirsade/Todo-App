import React from 'react';
import firebase from 'app/firebase/';
var { Route, Router, IndexRoute, hashHistory } = require('react-router');

import TodoApp from 'TodoApp';
import Login from 'Login';
import Game from 'Game';

  
  
  var requireLogin = (nextState, replace, next) => {
    if (!firebase.auth().currentUser) {
      replace('/');
    }
    next();
  }
  
  var redirectIfLogIn = (nextState, replace, next) => {
    if(firebase.auth().currentUser) {
      replace('/todos');
    }
    next();
  }
  
  export default (
    <Router history={hashHistory}>
        <Route path="/">
          <Route path="todos" component={TodoApp} onEnter={requireLogin}/>
          <Route path="todos/game" component={Game}/>
          <IndexRoute component={Login} onEnter={redirectIfLogIn}/>
        </Route>
      </Router>
  );