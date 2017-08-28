var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jquery');

var TodoList = require('TodoList');
var Todo = require('Todo');

describe('TodoList', () => {
    it('sould exist', () => {
        expect(Todo).toExist();
    });

    it('should render one Todo component for each todo item', () => {
        var todos = [
            {
                id: 1,
                text: 'walk the dog'
            }, {
                id: 2,
                text: 'clean the yard'
            }, {
                id: 3,
                text: 'clean my computer'
            }
        ];

        var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);
        var todosCpmponents = TestUtils.scryRenderedComponentsWithType(todoList, Todo);

        expect(todosCpmponents.length).toBe(todos.length);
    });

    it('should render empty message if no todos', () => {
        var todos = [];

        var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos}/>);
        var $el = $(ReactDOM.findDOMNode(todoList));

        expect($el.find('.container__message').length).toBe(1);
    });
});