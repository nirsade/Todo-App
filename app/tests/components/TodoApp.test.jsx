var React = require('react');
var ReactDom = require('react-dom');
var {Provider} = require('react-redux');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jquery');

var configureStore = require('configureStore');
// var TodoList = require('TodoList');
import TodoList from 'TodoList'
import {TodoApp} from 'TodoApp';

describe('TodoApp', () => {
    it('sould exist', () => {
        expect(TodoApp).toExist();
    });

    it('should render TodoList', () => {
        var store = configureStore.configure();
        var provider = TestUtils.renderIntoDocument(
            <Provider store={store}>
                <TodoApp/>
            </Provider>
        );

        var todoApp = TestUtils.scryRenderedComponentsWithType(provider, TodoApp)[0];
        var todoList = TestUtils.scryRenderedComponentsWithType(todoApp, TodoList);
        
        expect(todoList.length).toEqual(1);
    })
});