import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
const api = "http://localhost:4000/api/orders";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.state = {
      data: [],
      url: api,
      prevValue: "",
      prevSearch: ""
    };
  }
  handleSearch(value) {
    var url = "";
    var prevSearch = "";
    if (value == "") {
      url = api;
    } else {
      if (this.state.url == api) {
        url = this.state.url + "?search=" + value;
        prevSearch = value;
      }
      if (
        !this.state.url.includes("search") &&
        this.state.url.length > api.length
      ) {
        url = this.state.url + "&search=" + value;
        prevSearch = value;
      }

      if (this.state.url.includes("search=" + this.state.prevSearch)) {
        url = this.state.url.replace(this.state.prevSearch, value);
        prevSearch = value;
      }
    }
    this.setState({
      url: url,
      prevSearch: prevSearch
    });
  }

  handleChange(value) {
    var url = "";
    var prevValue = "";
    if (value == "all") {
      url = this.state.url.includes("?status")
        ? this.state.url
            .replace("?status=" + this.state.prevValue, "")
            .replace("&", "?")
        : this.state.url.replace("&status=" + this.state.prevValue, "");
    }
    if (this.state.url == api) {
      url = this.state.url + "?status=" + value;
      prevValue = value;
    }
    if (
      !this.state.url.includes("status") &&
      this.state.url.length > api.length
    ) {
      url = this.state.url + "&status=" + value;
      prevValue = value;
    }
    if (
      this.state.url.includes("status=" + this.state.prevValue) &&
      value != "all"
    ) {
      url = this.state.url.replace(this.state.prevValue, value);
      prevValue = value;
    }
    this.setState(
      {
        url: url,
        prevValue: prevValue
      },
      () => {
        this.props.handleToUpdate(this.state.url);
      }
    );
  }
  render() {
    return (
      <div className="container">
        <div class="row">
          <div class="col">
            <label>Поиск</label>
            <InputGroup className="mb-3">
              <FormControl
                ref="form"
                placeholder="Поиск"
                aria-label="Поиск"
                aria-describedby="basic-addon2"
                onChange={e => {
                  this.handleSearch(e.target.value);
                }}
              />
              <InputGroup.Append>
                <Button
                  variant="outline-secondary"
                  onClick={() => {
                    this.props.handleToUpdate(this.state.url);
                  }}
                >
                  Искать
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
          <div class="col">
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Статус</Form.Label>
              <Form.Control
                ref="select"
                as="select"
                onChange={e => {
                  this.handleChange(e.target.value);
                }}
              >
                <option value="all">Все</option>
                <option value="new">Новый</option>
                <option value="ready">Собран</option>
                <option value="shipping">Доставляется</option>
                <option value="shipped">Доставлен</option>
                <option value="canceled">Отменен</option>
              </Form.Control>
            </Form.Group>
          </div>
          <div class="col">
            <Button
              type="button"
              className="btn btn-warning"
              style={{ marginTop: "2rem" }}
              onClick={() => {
                this.setState(
                  {
                    url: api,
                    prevValue: "",
                    val: "all",
                    search: ""
                  },
                  () => {
                    this.refs.form.value = "";
                    this.refs.select.value = "all";
                    this.props.handleToUpdate(this.state.url);
                  }
                );
              }}
            >
              Сбросить
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
export default Search;
