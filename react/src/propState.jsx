/** @jsx React.DOM */
'use strict'

var React = require('react/addons');
var request = require('superagent');


var Counter = React.createClass({
  propTypes: {
    count: React.PropTypes.number
  },
  getDefaultProps() {
    return {
      initialCount: 0
    };
  },
  getInitialState() {
    return {
     count: this.props.initialCount
   };
  },
  countUp() {
    this.setState({ count: this.state.count + 1});
  },
  render() {
    return (
      <div>
      <span>{this.state.count}</span>
      <button onClick={this.countUp}>click</button>
      </div>
    );
  }
});

var TestDataURL = './mockResponse.json'

var User = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    id:   React.PropTypes.number.isRequired
  },
  render() {
    return (
      <div>{this.props.id}:{this.props.name}</div>
    );
  }
});

var Users = React.createClass({
  getInitialState() {
    return {
      users: [ {id: 1, name: "foo"}, {id: 2, name: "bar"} ]
    }
  },
  componentDidMount() {
    request
      .get(TestDataURL)
      .end((err, res) => {
        console.log("TestDataURL:"+TestDataURL);
        console.log("res:"+JSON.stringify(res));
        console.log("err:"+err);
        this.setState({users: res.body.users});
      });
  },
  render() {
    console.log("this.state.users:"+this.state.users);
    var users = this.state.users.map((user) => {
      return <User id={user.id} name={user.name} key={user.id}/>
    });
    return (
      <div>
        <p>ユーザー一覧</p>
        {users}
      </div>
    );
  }
});

var Todo = React.createClass({
  propTypes: {
    todo: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      text: React.PropTypes.string.isRequired
    }),
    // 削除するための処理をI/Fとして定義
    onDelete: React.PropTypes.func.isRequired
  },
  // 親に処理を委譲する
  _onDelete() {
    this.props.onDelete(this.props.todo.id);
  },
  render() {
    return (
      <div>
        <span>{this.props.todo.text}</span>
        <button onClick={this._onDelete}>delete</button>
      </div>
    );
  }
});

var TodoList = React.createClass({
  getInitialState() {
    return {
      todos: [
        {id:1, text:"advent calendar1"},
        {id:2, text:"advent calendar2"},
        {id:3, text:"advent calendar3"}
      ]
    };
  },
  // TodoListはこのComponentが管理しているので削除する処理もここにあるべき
  deleteTodo(id) {
    this.setState({
      todos: this.state.todos.filter((todo) => {
        return todo.id !== id;
      })
    });
  },
  render() {
    var todos = this.state.todos.map((todo) => {
      return <li key={todo.id}><Todo onDelete={this.deleteTodo} todo={todo} /></li>;
    });
    return <ul>{todos}</ul>;
  }
});

React.render(<Users />, document.getElementById("users"));
React.render(<TodoList />, document.getElementById("todoList"));

React.render(<Counter />, document.getElementById("app"));