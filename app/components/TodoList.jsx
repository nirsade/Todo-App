var React = require('react');
var {connect} = require('react-redux');
import Todo from 'Todo';
var TodoAPI = require('TodoAPI');

export var TodoList = React.createClass({
    render: function () {
        var {todos, showCompleted, searchText} = this.props;

        var renderTodos = () => {
            var filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);
            
            if (filteredTodos.length === 0) {
                return (
                    <div className="container__message">
                        <p>Nothing To Do ??  <a href="/#/todos/game">Play for fun</a></p>
                    </div>
                    
                );
            }
            return filteredTodos.map((todo) => {
                return (
                    <Todo key={todo.id} {...todo}/>
                );
            });
        };
        return (
            <div>
                {renderTodos()} 
            </div>
        )
    }
});

export default connect(
    (state) => {
        return state;
    }
)(TodoList);