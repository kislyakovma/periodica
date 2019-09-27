import React, { Suspense } from "react";
const Table = React.lazy(() => import("./components/Table"));
import "bootstrap/dist/css/bootstrap.min.css";
import Searc from "./components/Search";
const api = "http://localhost:4000/api/orders";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleToUpdate = this.handleToUpdate.bind(this);
    this.state = {
      outterUrl: localStorage.getItem("url") || api
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
        <Suspense
          fallback={
            <div className="container">
              <div className="spinner-border text-warning" role="status"></div>
            </div>
          }
        >
          <Table url={this.state.outterUrl} />
        </Suspense>
      </div>
    );
  }
}

export default App;
