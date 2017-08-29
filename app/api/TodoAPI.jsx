var $ = require('jquery')

module.exports = {
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