function loadData(tripInfo) {
  console.log(tripInfo);

  // var div = $('<div></div>').append(JSON.stringify(tripInfo));

  $("#content").empty();

  for (let i = 0; i < tripInfo.length; i++) {
    const oneTrip = tripInfo[i];

    const span = $("<span></span>").append(" rating: " + oneTrip.rating);

    const paragraph = $("<p></p>").append(oneTrip.title).append(span);

    $("#content").append(paragraph);
  }
}

function getInfo() {
  $.get("/getList", loadData);
}

function setData() {
  const name = $("#updateTrip")[0].value;

  const rating = $("#updateRating")[0].value;

  console.log("name and rating " + name + " " + rating);

  $.post("/setRating", { name, rating }, loadData);
}




function loadAddress(addy) {
  console.log(addy);

  // var div = $('<div></div>').append(JSON.stringify(tripInfo));

  $("#content").empty();
  //do an if to check value of html input with jquery, if empty run the existing code, else loop through but check for name matching

  for (let i = 0; i < addy.length; i++) {
    
    const loc = addy[i];

    const span = $("<span></span>");
    span.append("Username: " + loc.username).append($("<br>"))
    span.append("Address: " + loc.address).append($("<br>"));
    span.append("Line 2: " + loc.line2).append($("<br>"))
    span.append("City: " + loc.city).append($("<br>"))
    span.append("State: " + loc.state).append($("<br>"))
    span.append("ZIP Code: " + loc.zip).append($("<br>"))
    span.append($("<br>"))

    $("#content").append(span);
  }
}

function getAddress() {
  $.get("/getAddress", loadAddress);
}

function setAddress() {
  const username = $("#username")[0].value;
  const address = $("#address")[0].value;
  const line2 = $("#line2")[0].value;
  const city = $("#city")[0].value;
  const state = $("#state option:selected").text();
  const zip = $("#zip")[0].value;

  console.log('i ran')

  $.post("/setAddress", { username, address, line2, city, state, zip }, loadAddress);
}


//COLORS SECTION

function loadColors(color_data) {
  console.log(color_data);
  console.log('im LoadColors!');

  // var div = $('<div></div>').append(JSON.stringify(tripInfo));

  $("#colors").empty();
  //do an if to check value of html input with jquery, if empty run the existing code, else loop through but check for name matching

  for (let i = 0; i < color_data.length; i++) {
    
    const col = color_data[i];

    const span = $("<span></span>");
    span.append("Username: " + col.username).append($("<br>"))
    span.append("Color: " + col.color).append($("<br>"));
    span.append($("<br>"))

    $("#colors").append(span);
  }
}

function getColors() {
  $.get("/getColors", loadColors);
}

function setColors() {
  const username = $("#username")[0].value;
  const color = $("#color")[0].value;
  

  console.log('i ran')

  $.post("/setColors", { username, color}, loadColors);
}

//RESULTS SECTION

function loadResults(results) {
  console.log(results);

  // var div = $('<div></div>').append(JSON.stringify(tripInfo));

  $("#content").empty();
  //do an if to check value of html input with jquery, if empty run the existing code, else loop through but check for name matching

  for (let i = 0; i < results.length; i++) {
    
    const resu = results[i];

    const span = $("<span></span>");
    span.append("Username: " + resu.username).append($("<br>"))
    span.append("Color: " + resu.color).append($("<br>"));
    span.append("Address: " + resu.address).append($("<br>"));
    span.append("Line 2: " + resu.line2).append($("<br>"))
    span.append("City: " + resu.city).append($("<br>"))
    span.append("State: " + resu.state).append($("<br>"))
    span.append("ZIP Code: " + resu.zip).append($("<br>"))
    span.append($("<br>"))
    span.append($("<br>"))

    $("#content").append(span);
  }
}

function getResults() {
  $.get("/getResults", loadResults);
}