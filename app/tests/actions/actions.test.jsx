import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
var expect = require('expect');

import firebase, {firebaseRef} from 'app/firebase/';
import * as actions from'actions';

var createMockStore = configureMockStore([thunk]);

describe('Actions', () => {
    it('should generate search text actions', () => {
        var action = {
            type: 'SET_SEARCH_TEXT',
            searchText: 'something here'
        };

        var res = actions.setSearchText(action.searchText);

        expect(res).toEqual(action);
    })

    it('should generate add todo action', () => {
        var action = {
            type: 'ADD_TODO',
            todo: {
                id: '1',
                text: 'this is a new Todo',
                completed: false,
                createdAt: 100020
            }
        }

        var res = actions.addTodo(action.todo);

        expect(res).toEqual(action)
    });

    it('should create todo and dispatch ADD_TODO', (done) => {
        const store = createMockStore({});
        const todoText = 'My Todo';

        store.dispatch(actions.startAddTodo(todoText)).then( ()=> {
            const actions = store.getActions();
            expect(actions[0]).toInclude({
                type: 'ADD_TODO'
            });
            expect(actions[0].todo).toInclude({
                text: todoText
            });
            done();
        }).catch(done);
    });

    it('should generate toggle show completed', () => {
        var action ={
            type: 'TOGGLE_SHOW_COMPLETED'
        }
        
        var res = actions.toggleShowCompleted();

        expect(res).toEqual(action)
    });

    it('should generate update todo', () => {
        var action ={
            type: 'UPDATE_TODO',
            id: 2,
            updates: {completed: false}
        }
        
        var res = actions.updateTodo(action.id, action.updates);

        expect(res).toEqual(action)
    });
  
    it('should generate ADD_TODOS action', () => {
        var todos = [
            {
                id: 11,
                text: 'Hello',
                completed: false,
                completedAt: undefined,
                createdAt: 158
            }
        ];

        var action = {
            type: 'ADD_TODOS',
            todos
        }

        var res = actions.addTodos(todos);
        expect(res).toEqual(action);
    });

    describe('test with firebase todos', () => {
        var testTodoRef;

        beforeEach((done) => {
            var todosRef = firebaseRef.child('todos');

            todosRef.remove().then(() => {
                testTodoRef = firebaseRef.child('todos').push();  
                
                testTodoRef.set({
                    text: 'something to do',
                    completed: false,
                    createdAt: 234234
                })

            })
            .then(() => done())
            .catch(done);
        });

        afterEach((done) => {
            testTodoRef.remove().then(() => done());
        });

        it('should toogle todo and dispatch UPDATE_TODO action', (done) => {
            const store = createMockStore({});
            const action = actions.startToggleTodo(testTodoRef.key, true);

            store.dispatch(action).then(() => {

                const mockActions = store.getActions();

                expect(mockActions[0]).toInclude({
                    type: 'UPDATE_TODO',
                    id: testTodoRef.key
                });

                expect(mockActions[0].updates).toInclude({
                    completed: true
                });

                expect(mockActions[0].updates.completedAt).toExist();

                done();
            }, done());
        });

        it('should populate todos and dispatch and ADD_TODOS', (done) => {
            const store = createMockStore({});
            const action = actions.startAddTodos();

            store.dispatch(action).then(() => {
                const mockActions = store.getActions();

                expect(mockActions[0].type).toEqual('ADD_TODOS');
                expect(mockActions[0].todos.length).toEqual(1);
                expect(mockActions[0].todos[0].text).toEqual('something to do');
                done();

            }, done)
        })
    });
});