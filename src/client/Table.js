import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import "./index.css";
import axios from "axios";
import jQuery from "jquery";
import $ from "jquery";
const api = "http://localhost:4000/api/orders";
var count = 0;

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
    var output = [];
    for (var i in object.orderItems){
      if (i < Object.keys(object.orderItems).length - 1){
      output.push(`${object.orderItems[i].productName}` + " " + `${object.orderItems[i].count}` + ",");
      }
      else{
        output.push(`${object.orderItems[i].productName}` + " " + `${object.orderItems[i].count}`);
      }
    };
    return output;
  }
  def(url){
    this.setState({url: url},() => {$.ajax({
      url: this.state.url,
      type: "GET",
      dataType: "json",
      ContentType: "application/json",
      success: function(data) {
        this.setState({ data: data });
        
      }.bind(this),
      error: function(jqXHR) {
        
      }.bind(this)
      
    });
    
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
  });
    
  }
  changeState(url){
    console.log(this.state.url);
    if (!(this.state.url.includes("sortBy="))){
      this.setState({url: this.state.url.length > api.length ? this.state.url+"&sortBy="+url : this.state.url+"?sortBy="+url, dir: this.state.dir, prevSort: url},() => {$.ajax({
        url: this.state.url,
        type: "GET",
        dataType: "json",
        ContentType: "application/json",
        success: function(data) {
          this.setState({ data: data });
          
        }.bind(this),
        error: function(jqXHR) {
          
        }.bind(this)
        
      });
      
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
    });console.log("");
    }
    if (url == this.state.prevSort){
      this.setState({url: this.state.dir ? this.state.url.replace("&sortDir=desc","") : this.state.url+"&sortDir=desc", dir: !this.state.dir},() => {$.ajax({
        url: this.state.url,
        type: "GET",
        dataType: "json",
        ContentType: "application/json",
        success: function(data) {
          this.setState({ data: data });
          
        }.bind(this),
        error: function(jqXHR) {
          
        }.bind(this)
      });
      
    });
      console.log("");
    }
    if ((url != this.state.prevSort)&&(this.state.url.includes("sortBy="))){
      this.setState({url: this.state.url.replace(this.state.prevSort,url), dir: !this.state.dir, prevSort: url},() => {$.ajax({
        url: this.state.url,
        type: "GET",
        dataType: "json",
        ContentType: "application/json",
        success: function(data) {
          this.setState({ data: data });
          
        }.bind(this),
        error: function(jqXHR) {
          
        }.bind(this)
        
      });
      
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
    });console.log(""); 

    }
  
     
  
    
   
    
    
    console.log(this.state);
  }
  componentDidUpdate(prevProps) {
    
    if (this.props.url !== prevProps.url) {
      this.def(this.props.url);
    }
  }
  componentDidMount() {
    console.log(this.props.url)
   
    this.def(this.props.url)
    
  }
  render() {
    return (
      <table className="blueTable">
        <thead>
          <th><a style={{color: "white"}} href="#" onClick={() => this.changeState("id")}>id</a></th>
          <th><a style={{color: "white"}} href="#" onClick={() => this.changeState("fullName")}>Имя</a></th>
          <th>Товары</th>
          <th>Статус</th>
          <th><a style={{color: "white"}} href="#" onClick={() => this.changeState("email")}>Email</a></th>
          <th><a style={{color: "white"}} href="#" onClick={() => this.changeState("address")}>Адрес</a></th>
          <th><a style={{color: "white"}} href="#" onClick={() => this.changeState("sum")}>Сумма</a></th>
        </thead>
        <tbody>
          {this.state.data.map((item, key) => {
            return (
              <tr key={key}>
                <td>{item.id}</td>
                <td>{item.fullName}</td>
                <td style={{maxWidth:"16rem"}}>{this.getItems(item)}</td>
                <td>{item.status}</td>
                <td>{item.email}</td>
                <td>{item.address}</td>
                <td>{item.sum}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
export default Table;
