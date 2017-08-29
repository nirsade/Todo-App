var expect = require('expect');
var df = require('deep-freeze-strict');

var reducers = require('reducers');

describe('Reducers', () => {
    describe('SearchTextReducers', () => {
        it('should set searchText', () => {
            var action = {
                type: 'SET_SEARCH_TEXT',
                searchText: 'something'
            }
            var res = reducers.searchTextReducer(df(''), df(action));

            expect(res).toEqual(action.searchText);
        });
    });

    describe('showCompletedReducer', () => {
        it('should toggle showCompleted', () => {
            var action = {
                type: 'TOGGLE_SHOW_COMPLETED',
            };
            var res = reducers.showCompletedReducer(df(false), df(action));

            expect(res).toEqual(true);
        });
    });

    describe('todoReducer', () => {
        it('should add new todo', () => {
            var action = {
                type: 'ADD_TODO',
                text: 'new TODO'
            };
            var res = reducers.todoReducer(df([]), df(action));

            expect(res.length).toEqual(1);

            expect(res[0].text).toEqual(action.text);
        });

        it('should change the todo show completed property', () => {
            var todos = [
                {
                    id: 1,
                    text: 'first',
                    completed: false,
                    createdAt: 123,
                    completedAt: 125            
                },
                {
                    id: 2,
                    text: 'second',
                    completed: true,
                    createdAt: 122,
                    completedAt: 124            
                }
            ];
            var action = {
                type: 'TOGGLE_TODO',
                id: 2
            }

            var res = reducers.todoReducer(todos, action);

            expect(res[1].completed).toEqual(false);
            expect(res[1].completedAt).toEqual(undefined);
        });

        it('should add existing todos', () => {
            var todos = [{
                    id: 1,
                    text: 'first',
                    completed: false,
                    createdAt: 123,
                    completedAt: 125            
                }];
            var action = {
                type: 'ADD_TODOS',
                todos
            };
            var res = reducers.todoReducer(df([]), df(action));

            expect(res.length).toEqual(1);

            expect(res[0]).toEqual(todos[0]);
        });
    });
});