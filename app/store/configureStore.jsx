var redux = require('redux');
var {searchTextReducer, showCompletedReducer, todoReducer} = require('reducers');

export var configure = (initialState = {}) => {
    var reducer = redux.combineReducers({
        searchText: searchTextReducer,
        showCompleted: showCompletedReducer,
        todos: todoReducer
    });

    var store = redux.createStore(reducer, initialState, redux.compose(
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

    return store;
}