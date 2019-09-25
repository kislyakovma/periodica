import React from "react";
import Table from "./components/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Searc from "./components/Search";
const api = "http://localhost:4000/api/orders";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleToUpdate = this.handleToUpdate.bind(this);
    this.state = {
      outterUrl: api
    };
  }

  handleToUpdate(someArg) {
    console.log(someArg);
    this.setState({ outterUrl: someArg });
  }

  render() {
    return (
      <div className="container">
        <Searc handleToUpdate={this.handleToUpdate} />
        <Table url={this.state.outterUrl} />
      </div>
    );
  }
}

export default App;
