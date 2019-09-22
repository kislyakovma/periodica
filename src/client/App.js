import React, { useState } from "react";
import "./App.css";
import "antd/dist/antd.css";
import "./index.css";
import { Input } from "antd";
import { Select } from "antd";
import { Button } from "antd";
import axios from "axios";
import Table from "./Table";
import { configConsumerProps } from "antd/lib/config-provider";
const api = "http://localhost:4000/api/orders";

const { Option } = Select;

const { Search } = Input;

class App extends React.Component {
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
  handleSearch(value){
    
    if (this.state.url == api){
      this.setState(
        {
          url:
            this.state.url +
            "?search=" +
            value,
            prevSearch: value
        },
        () => {
          console.log("");
        }
      );
    }
    if (!(this.state.url.includes("search")) && (this.state.url.length > api.length)){
      this.setState(
        {
          url:
            this.state.url +
            "&serach=" +
            value,
            prevSearch: value
        },
        () => {
          console.log("");
        }
      );
    }
    if ((this.state.url.includes("search="+this.state.prevSearch))){
      this.setState(
        {
          url:
            this.state.url.replace(this.state.prevSearch,value),
            prevSearch: value
        },
        () => {
          console.log("");
        }
      );
    }
  }

  handleChange(value) {
    if(value == "all"){
      this.setState(
        {
          url:
            this.state.url.includes("?status") ? this.state.url.replace("?status=" + this.state.prevValue,"") : this.state.url.replace("&status=" + this.state.prevValue,"")
            
        },
        () => {
          console.log("");
        }
      );
    }
    if (this.state.url == api){
      this.setState(
        {
          url:
            this.state.url +
            "?status=" +
            value,
            prevValue: value
        },
        () => {
          console.log("");
        }
      );
    }
    if (!(this.state.url.includes("status")) && (this.state.url.length > api.length)){
      this.setState(
        {
          url:
            this.state.url +
            "&status=" +
            value,
            prevValue: value
        },
        () => {
          console.log("");
        }
      );
    }
    if ((this.state.url.includes("status="+this.state.prevValue))&&(value != "all")){
      this.setState(
        {
          url:
            this.state.url.replace(this.state.prevValue,value),
            prevValue: value
        },
        () => {
          console.log("");
        }
      );
    }
    
    
  }

  render() {
    return (
      <div className="App">
        <div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              <h3 style={{ float: "left" }}>Поиск по заказам</h3>
              <div>
                <Search
                  placeholder="Введите что-нибудь"
                  enterButton="Поиск"
                  size="large"
                  onSearch={value => {
                    this.handleSearch(value);
                  }}
                />
              </div>
            </div>
            <div style={{ marginLeft: "2rem", marginBottom: "2rem" }}>
              <h3 style={{ float: "left" }}>Статус заказа</h3>
              <div>
                <Select
                  defaultValue="all"
                  style={{ width: 150 }}
                  onChange={value => {
                    this.handleChange(value);
                  }}
                >
                  <Option value="new">Новый</Option>
                  <Option value="shipped">Доставлен</Option>
                  <Option value="canceled">Отменен</Option>
                  <Option value="shipping">Доставляется</Option>
                  <Option value="ready">Собран</Option>
                  <Option value="all"> Все</Option>
                </Select>
              </div>
            </div>
            <div style={{ marginLeft: "2rem" }}>
              <h3 style={{ float: "left" }}>Сброс</h3>
              <div>
                <Button onClick={() => {
                    this.setState(
                      {
                        url:api,
                        prevValue:""
                      },
                      () => {
                        console.log("");
                      }
                    );
                  }} type="danger" style={{ height: "40px" }}>
                  Сбросить фильтры
                </Button>
              </div>
            </div>
          </div>
          <div>
            <Table url={this.state.url} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
