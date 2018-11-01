import React from "react";

class AsyncComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = { Component: null };
  }
  componentDidMount() {
    this.props.loader().then(
      Component => {
        this.setState({ Component })}
    )
  }
  render() {
    return <div>223</div>;
  }
}

export default AsyncComponent