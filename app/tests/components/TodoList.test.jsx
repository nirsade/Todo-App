var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jquery');

import {configure} from 'configureStore'; 
import ConnectedTodoList, {TodoList} from 'TodoList';
import ConnectedTodo, {Todo} from 'Todo';

describe('TodoList', () => {
    it('sould exist', () => {
        expect(Todo).toExist();
    });

    it('should render one Todo component for each todo item', () => {
        var todos = [{
                id: 1,
                text: 'walk the dog',
                completed: false,
                completedAt: undefined,
                createdAt: 120
            }, {
                id: 2,
                text: 'clean the yard',
                completed: false,
                completedAt: undefined,
                createdAt: 120
            }];

        var store = configure({
            todos: todos
        });
        var provider = TestUtils.renderIntoDocument(
            <Provider store={store}>
                <ConnectedTodoList/>
            </Provider>
        );

        
        var todoList = TestUtils.scryRenderedComponentsWithType(provider, ConnectedTodoList)[0];
        var todosCpmponents = TestUtils.scryRenderedComponentsWithType(todoList, ConnectedTodo);

        expect(todosCpmponents.length).toBe(todos.length);
    });

    it('should render empty message if no todos', () => {
        var todos = [];

        var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);
        var $el = $(ReactDOM.findDOMNode(todoList));

        expect($el.find('.container__message').length).toBe(1);
    });
});