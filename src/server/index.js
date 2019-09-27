const express = require("express");
const bodyParser = require("body-parser");
const jsonQuery = require("json-query");
const _ = require("underscore");

const app = express();
const cors = require("cors");
const data = require("./data/data.json");

app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/orders", function(req, res) {
  order = addSum(data);
  if (Object.keys(req.query).length == 0) {
    res.send(order);
  }
  if (Object.keys(req.query).includes("sortBy")) {
    order = sortByKey(order, req.query.sortBy, req.query.sortDir);
  }
  if (Object.keys(req.query).includes("search")) {
    order = search(order, req.query.search);
  }
  if (Object.keys(req.query).includes("status")) {
    order = filter(order, req.query.status.toString());
  }
  res.send(order);
});

app.listen(4000, function() {
  console.log("Server is listening on port 4000");
});

//Functions
function addSum(data) {
  for (var i in data) {
    var b = 0;
    for (var j in data[i].orderItems) {
      b +=
        parseInt(data[i].orderItems[j].price, 10) *
        parseInt(data[i].orderItems[j].count, 10);
    }
    data[i].sum = b.toString();
  }

  return data;
}
function sortByKey(order, key, dir) {
  return order.sort(function(a, b) {
    if (key != "sum") {
      var x = a[key];
      var y = b[key];
      if (dir != undefined) {
        return x < y ? -1 : x > y ? 1 : 0;
      } else {
        return y < x ? -1 : y > x ? 1 : 0;
      }
    } else {
      var x = parseInt(a[key], 10);
      var y = parseInt(b[key], 10);
      if (dir != undefined) {
        return x < y ? -1 : x > y ? 1 : 0;
      } else {
        return y < x ? -1 : y > x ? 1 : 0;
      }
    }
  });
}
function search(order, key) {
  var result = [];
  let keys = ["id", "fullName", "address", "email"];
  for (var s in keys) {
    result = Object.assign(
      {},
      result,
      jsonQuery(`[**][*${keys[s]}=${key}]`, { data: order }).value
    );
  }
  var cleaned = [];
  Object.values(result).forEach(function(itm) {
    var unique = true;
    cleaned.forEach(function(itm2) {
      if (_.isEqual(itm, itm2)) unique = false;
    });
    if (unique) cleaned.push(itm);
  });
  return cleaned;
}

function filter(order, key) {
  return (filtered = Object.values(order).filter(a => a.status == `${key}`));
}
