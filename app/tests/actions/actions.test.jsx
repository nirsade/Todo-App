var expect = require('expect');
var actions = require('actions');

describe('Actinos', () => {
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
            text: 'new Todo'
        }

        var res = actions.addTodo(action.text);

        expect(res).toEqual(action)
    });

    it('should generate toggle show completed', () => {
        var action ={
            type: 'TOGGLE_SHOW_COMPLETED'
        }
        
        var res = actions.toggleShowCompleted();

        expect(res).toEqual(action)
    });

    it('should generate toggle todo', () => {
        var action ={
            type: 'TOGGLE_TODO',
            id: 2
        }
        
        var res = actions.toggleTodo(action.id);

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
})