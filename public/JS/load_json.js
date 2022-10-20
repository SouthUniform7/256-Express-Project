/*$(document).ready(function () {
    $.get("data/images.json", updatesImage);
}); */
let i = 0;
function loadRandomImage(){
    $.get("db/images.json", (data) => {
        i += 1;
        const randomIndex = Math.floor(Math.random() * 7)
        const imageInfo = data[randomIndex]; 
        const span = $("<span>").text(imageInfo.title)
        const img = $("<img/>").attr("src", imageInfo.image);
        const div = $("<div></div>").append(span).append($("<br>")).append(img)
        if (i%2 == 1){
            $("#col1").append(div)
        } else{
            $("#col2").append(div)
        }
    });
}

$(document).ready(function() {
    $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        console.log(value);
        $("#images div").filter( function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});