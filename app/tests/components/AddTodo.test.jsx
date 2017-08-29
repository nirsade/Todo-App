var React = require('react');
var ReactDom = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jquery');

var {AddTodo} = require('AddTodo');

describe('AddTodo', () => {
    it('sould exist', () => {
        expect(AddTodo).toExist();
    });

    it('should dispatch ADD_TODO when valid data past', () => {
        var todoText = 'check mail';
        var action = {
            type: 'ADD_TODO',
            text: todoText
        }
        var spy = expect.createSpy();
        var addTodo = TestUtils.renderIntoDocument(<AddTodo dispatch={spy} />);
        var $le = $(ReactDom.findDOMNode(addTodo));

        addTodo.refs.todoText.value = todoText;
        TestUtils.Simulate.submit($le.find('form')[0]);

        expect(spy).toHaveBeenCalledWith(action);
    });


    it('should not diapatch ADD_TODO when invalid todo text', () => {
        var todoText = '';
        var spy = expect.createSpy();
        var addTodo = TestUtils.renderIntoDocument(<AddTodo dispatch={spy} />);
        var $le = $(ReactDom.findDOMNode(addTodo));

        addTodo.refs.todoText.value = todoText;
        TestUtils.Simulate.submit($le.find('form')[0]);

        expect(spy).toNotHaveBeenCalled();
    });
});