var React = require('react');
var ReactDom = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jquery');

var TodoApp = require('TodoApp');

describe('TodoApp', () => {
    it('sould exist', () => {
        expect(TodoApp).toExist();
    });

    it('should add todo to the todos state on handleAddTodo', () => {
        var todoText = 'test Text';
        var todoApp = TestUtils.renderIntoDocument(<TodoApp/>);

        todoApp.setState({todos: []});
        todoApp.handleAddTodo(todoText);

        expect(todoApp.state.todos[0].text).toBe(todoText);

        expect(todoApp.state.todos[0].createdAt).toBeA('number');

    });

    it('should toggle completed value when handleToggle called', () => {
        var todoData = {
            id: 11,
            text: 'Test features',
            completed: false,
            createdAt: 0,
            completedAt: undefined
        }

        var todoApp = TestUtils.renderIntoDocument(<TodoApp/>);
        todoApp.setState({todos: [todoData]});

        expect(todoApp.state.todos[0].completed).toBe(false);
        todoApp.handleToggle(11);
        expect(todoApp.state.todos[0].completed).toBe(true);

        expect(todoApp.state.todos[0].completedAt).toBeA('number');       
    });

    it('should remove comletedAt when toogle completed from true to false', () => {
        var todoData = {
            id: 11,
            text: 'Test features',
            completed: true,
            createdAt: 0,
            completedAt: 100
        }

        var todoApp = TestUtils.renderIntoDocument(<TodoApp/>);
        todoApp.setState({todos: [todoData]});

        expect(todoApp.state.todos[0].completedAt).toBeA('number');
        todoApp.handleToggle(11);
        expect(todoApp.state.todos[0].completedAt).toNotExist();
    })

    //  test that toggle from true to false completedAt get removed
});