/** @jsx React.DOM */
'use strict'

var React = require('react/addons')
var Router = require('react-router-component')
var DocumentTitle = require('react-document-title')

var Locations = Router.Locations
var Location = Router.Location
var CaptureClicks = require('react-router-component/lib/CaptureClicks')
var Link = require('react-router-component').Link


var App = React.createClass({displayName: "App",

  getInitialState: function() {
    if (typeof window === 'undefined') {
      var entryPath = this.props.path
    } else {
      var entryPath = window.location.pathname
    }
    return {
      entryPath: entryPath
    }    
  },

  render: function() {
    return (
      React.createElement("html", null, 
        React.createElement("head", null, 
          React.createElement("title", null, "%react-iso-vgs%"), 
          React.createElement("meta", {charSet: "UTF-8"}), 
          React.createElement("link", {href: "http://fonts.googleapis.com/css?family=Merriweather+Sans:800", rel: "stylesheet", type: "text/css"}), 
          React.createElement("link", {rel: "stylesheet", type: "text/css", href: "http://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.1/normalize.min.css"}), 
          React.createElement("link", {rel: "stylesheet", type: "text/css", href: "/css/style.css"})
        ), 
        React.createElement("body", null, 
          "Hello! This page is made by React.js!!!"
        )
      )
    )
  }

})


module.exports = {
  routes: App,
  title: DocumentTitle
}


// Bootstrap client
if (typeof window !== 'undefined') {
  window.onload = function() {
    React.render(React.createElement(App), document)
  }
}
