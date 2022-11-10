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
  console.log(state);
  const zip = $("#zip")[0].value;

  $.post("/setAddress", { username, address, line2, city, state, zip }, loadAddress);
}

