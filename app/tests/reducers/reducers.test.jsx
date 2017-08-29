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
                todo: {
                    id: '1',
                    text: 'this is a new Todo',
                    completed: false,
                    createdAt: 100020
                }
            };
            var res = reducers.todoReducer(df([]), df(action));

            expect(res.length).toEqual(1);

            expect(res[0]).toEqual(action.todo);
        });

        it('should update todo', () => {
            var todos = [
                {
                    id: 1,
                    text: 'first',
                    completed: true,
                    createdAt: 123,
                    completedAt: 125            
                }
            ];
            var updates = {
                completed: false,
                completedAt: null
            }
            var action = {
                type: 'UPDATE_TODO',
                id: todos[0].id,
                updates
            }

            var res = reducers.todoReducer(df(todos), df(action));

            expect(res[0].completed).toEqual(updates.completed);
            expect(res[0].completedAt).toEqual(updates.completedAt);
            expect(res[0].text).toEqual(todos[0].text);
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