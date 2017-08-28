var React = require('react');

var AddTodo = React.createClass({
    handleSubmit: function (e) {
        e.preventDefault();
        var todoText = this.refs.todoText.value;

        if (todoText.length > 0) {
            this.refs.todoText.value = '';
            this.props.onAddTodo(todoText);
        } else {
            this.refs.todoText.focus();
        }
    },
    render: function () {
        var { text, id } = this.props;
        return (
            <div className="container__footer">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" ref="todoText" placeholder="what you need todo"/>
                    <button className="button expanded">Add Todo</button>
                </form>
            </div>
        )
    }
});

module.exports = AddTodo;