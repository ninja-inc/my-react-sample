/** @jsx React.DOM */
'use strict'

var React = require('react/addons');
var Counter = React.createClass({
  getInitialState() {
    return {
     count: 0
   };
  },
  onClick() {
    this.setState({ count: this.state.count + 1});
  },
  render() {
    return (
      <div>
      <span>{this.state.count}</span>
      <button onClick={this.onClick}>click</button>
      </div>
    );
  }
});

React.render(<Counter />, document.getElementById("app"));