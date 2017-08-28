var React = require('react');
var ReactDom = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jquery');

var AddTodo = require('AddTodo');

describe('AddTodo', () => {
    it('sould exist', () => {
        expect(AddTodo).toExist();
    });

    it('should call onAddTodo prop with valid data', () => {
        var todoText = 'check mail';
        var spy = expect.createSpy();
        var addTodo = TestUtils.renderIntoDocument(<AddTodo onAddTodo={spy} />);
        var $le = $(ReactDom.findDOMNode(addTodo));

        addTodo.refs.todoText.value = todoText;
        TestUtils.Simulate.submit($le.find('form')[0]);

        expect(spy).toHaveBeenCalledWith(todoText);
    });


    it('should not call onAddTodo prop with invalid data', () => {
        var todoText = '';
        var spy = expect.createSpy();
        var addTodo = TestUtils.renderIntoDocument(<AddTodo onAddTodo={spy} />);
        var $le = $(ReactDom.findDOMNode(addTodo));

        addTodo.refs.todoText.value = todoText;
        TestUtils.Simulate.submit($le.find('form')[0]);

        expect(spy).toNotHaveBeenCalled();
    });
});