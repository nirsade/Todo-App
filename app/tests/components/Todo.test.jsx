var React = require('react');
var ReactDom = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jquery');

import * as actions from 'actions';
var {Todo} = require('Todo');

describe('Todo', () => {
    it('sould exist', () => {
        expect(Todo).toExist();
    });

    it('should dispatch TOGGLE_TODO action on click', () => {
        var todoData = {
            id: 11,
            text: 'Write Todo',
            completed: false
        };
        var action = actions.startToggleTodo(todoData.id, !todoData.completed);

        var spy = expect.createSpy();
        var todo = TestUtils.renderIntoDocument(<Todo {...todoData} dispatch={spy}/>);

        var $el = $(ReactDom.findDOMNode(todo));

        TestUtils.Simulate.click($el[0]);

        expect(spy).toHaveBeenCalledWith(action);
        
    });
});