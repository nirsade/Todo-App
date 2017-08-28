var React = require('react');
var ReactDom = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jquery');

var TodoSearch = require('TodoSearch');

describe('TodoSearch', () => {
    it('sould exist', () => {
        expect(TodoSearch).toExist();
    });

    it('should call onSearch with entered inout text', () => {
        var searchText = 'Dog';
        var spy = expect.createSpy();
        var todoSearch = TestUtils.renderIntoDocument(<TodoSearch onSearch={spy}/>);
        
        todoSearch.refs.searchText.value = searchText;
        TestUtils.Simulate.change(todoSearch.refs.searchText);

        expect(spy).toHaveBeenCalledWith(false, 'Dog');
    });

    it('should call with onSearch with proper checked value', () => {
        var spy = expect.createSpy();
        var todoSearch = TestUtils.renderIntoDocument(<TodoSearch onSearch={spy}/>);

        todoSearch.refs.showCompleted.checked = true;
        TestUtils.Simulate.change(todoSearch.refs.showCompleted);

        expect(spy).toHaveBeenCalledWith(true, '');
    });
});