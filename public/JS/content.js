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

    const name = $('#updateTrip') [0].value;

    const rating = $('#updateRating') [0].value;

 

    console.log('name and rating ' + name + " " + rating)

    $.post("/setRating", { name, rating }, loadData);

}