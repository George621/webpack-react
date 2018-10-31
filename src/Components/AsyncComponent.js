import React from "react";
import PropTypes from 'prop-types';
// Somewhere in code
class AsyncComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = { Component: null };
  }
  componentDidMount() {
    this.props.loader().then(
      Component => {
          console.log(Component)
        this.setState({ Component })}
    )
  }
  render() {
    return (
      <h1>Hello I am home page</h1>
    )
  }
}

export default AsyncComponent