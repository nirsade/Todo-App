var expect = require('expect');

var TodoAPI = require('TodoAPI');

describe('TodoAPI', () => {

    beforeEach( () => {
        localStorage.removeItem('todos');
    })

    it('should exist', () => {
        expect(TodoAPI).toExist();
    });

    describe('setTodos', () => {
        it('should set valid todos array', () => {
            var todos = [{
                id: 12,
                text: 'test all files',
                completed: false
            }];

            TodoAPI.setTodos(todos);

            var actualTodos = JSON.parse(localStorage.getItem('todos'));

            expect(actualTodos).toEqual(todos);
        });

        it('should not set invalid todos array', () => {
            var badTodos = { a: 'b' };
            TodoAPI.setTodos(badTodos);

            expect(localStorage.getItem('todos')).toBe(null);
        })
    });

    describe('getTodos', () => {
        it('should return rmpty arry for bad localStorage data', () => {
            var actualTodos = TodoAPI.getTodos();
            expect(actualTodos).toEqual([]);
        });

        it('should return todo if valid array in local storage', () => {
            var todos = [{
                id: 12,
                text: 'test all files',
                completed: false
            }];

            localStorage.setItem('todos', JSON.stringify(todos));
            var actualTodos = TodoAPI.getTodos();
            expect(actualTodos).toEqual(todos);
        });
    });

    describe('filterTodos', () => {
        var todos = [{
            id: 1, 
            text: 'some text',
            completed: true
        }, {            
            id: 2, 
            text: 'this text',
            completed: false
        }, {
            id: 3, 
            text: 'some text',
            completed: true
        }];

        it('should return all items if showCompleted is true', () => {
            var filterTodos = TodoAPI.filterTodos(todos, true, '');
            expect(filterTodos.length).toBe(3);
        });

        it('should return only non-completed items if showCompleted is false', () => {
            var filterTodos = TodoAPI.filterTodos(todos, false, '');
            expect(filterTodos.length).toBe(1);
        });

        it('should sort by completed status', () => {
            var filterTodos = TodoAPI.filterTodos(todos, true, '');
            expect(filterTodos[0].completed).toBe(false);
        });

        it('should filter todos by searchText', () => {
            var filterTodos = TodoAPI.filterTodos(todos, true, 'some');
            expect(filterTodos.length).toBe(2);
        });

        it('should return all the todos if the searchText is empty', () => {
            var filterTodos = TodoAPI.filterTodos(todos, true, '');
            expect(filterTodos.length).toBe(3);
        });
    });
})