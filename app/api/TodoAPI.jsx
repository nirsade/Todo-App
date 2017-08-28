var $ = require('jquery')

module.exports = {
    setTodos: function (todos) {
        if ($.isArray(todos)) {
            localStorage.setItem('todos', JSON.stringify(todos));
            return todos;
        }
    },
    getTodos: function () {
        var stringTodos = localStorage.getItem('todos');
        var todos = [];

        try {
            todos = JSON.parse(stringTodos);
        } catch (e) {

        }

        return $.isArray(todos) ? todos : [];
    },
    filterTodos: function (todos, showCompleted, searchText) {
        var filterTodos = todos;

        filterTodos = filterTodos.filter( (todo) => {
            return !todo.completed || showCompleted;
        });

        if (searchText !== '') {
            filterTodos = filterTodos.filter( (todo) => {
                var todoText = todo.text.toLowerCase();
                return todoText.indexOf(searchText) > -1;
            })
        }



        filterTodos.sort( (a, b) => {
            if (!a.completed && b.completed) {
                return -1;
            } else if (a.completed && !b.completed) {
                return 1;
            } else {
                return 0;
            }
        });


        return filterTodos;
    }
};