import React from "react";
import "../App.css";
import "antd/dist/antd.css";
import "../index.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Badge from "react-bootstrap/Badge";
const api = "http://localhost:4000/api/orders";

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.getItems = this.getItems.bind(this);
    this.changeState = this.changeState.bind(this);
    this.def = this.def.bind(this);
    this.state = {
      data: [],
      url: this.props.url,
      dir: false,
      prevSort: ""
    };
  }
  getItems(object) {
    return (
      <table>
        {object.orderItems.map((item, key) => {
          return (
            <div>
              <tr>
                <td>{item.productName}</td>
                <td>{item.count} шт.</td>
              </tr>
            </div>
          );
        })}
      </table>
    );
  }
  def(url) {
    this.setState(
      {
        url: url
      },
      () => {
        axios.get(url).then(({ data }) =>
          this.setState({
            data: data
          })
        );
      }
    );
  }
  changeState(url) {
    console.log(this.state.url);
    if (!this.state.url.includes("sortBy=")) {
      this.setState(
        {
          url:
            this.state.url.length > api.length
              ? this.state.url + "&sortBy=" + url
              : this.state.url + "?sortBy=" + url,
          dir: this.state.dir,
          prevSort: url
        },
        () => {
          this.def(this.state.url);
        }
      );
      console.log("");
    }
    if (url == this.state.prevSort) {
      this.setState(
        {
          url: this.state.url.includes("&sortDir=desc")
            ? this.state.url.replace("&sortDir=desc", "")
            : this.state.url + "&sortDir=desc",
          dir: !this.state.dir,
          prevSort: this.state.prevSort
        },
        () => {
          console.log(this.state.prevSort);
          this.def(this.state.url);
        }
      );
    }
    if (url != this.state.prevSort && this.state.url.includes("sortBy=")) {
      this.setState(
        {
          url: this.state.url.replace(this.state.prevSort, url),
          dir: !this.state.dir,
          prevSort: url
        },
        () => {
          this.def(this.state.url);
        }
      );
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.url !== prevProps.url) {
      this.def(this.props.url);
    }
  }
  componentDidMount() {
    this.def(this.props.url);
  }
  render() {
    return (
      <table className="table">
        <thead>
          <th>
            <a href="#" onClick={() => this.changeState("id")}>
              ID
            </a>
          </th>
          <th>
            <a href="#" onClick={() => this.changeState("fullName")}>
              Имя
            </a>
          </th>
          <th> Товары </th>
          <th> Статус </th>
          <th>
            <a href="#" onClick={() => this.changeState("email")}>
              Email
            </a>
          </th>
          <th>
            <a href="#" onClick={() => this.changeState("address")}>
              Адрес
            </a>
          </th>
          <th>
            <a href="#" onClick={() => this.changeState("sum")}>
              Сумма
            </a>
          </th>
        </thead>
        <tbody>
          {this.state.data.map((item, key) => {
            return (
              <tr key={key}>
                <td> {item.id} </td> <td> {item.fullName} </td>
                <td>{this.getItems(item)}</td>
                <td>
                  <Badge variant="primary">{item.status}</Badge>
                </td>
                <td> {item.email} </td> <td> {item.address} </td>
                <td> {item.sum} </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
export default Table;
