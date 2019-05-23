$(document).ready(function () {

    intializeButtons();

    $('#buttonContainer').on("click", ".tagButton", function () {
        getGifs($(this).attr("data-value"));
    })

    $('#gifContainer').on("click", ".gifImage", function () {
        toggleImage($(this));
    })




});



var tags = ['cat', 'dog', 'snake', 'fish', 'raccoon', 'bear', 'lion', 'bird', 'lizard', 'panther', 'mouse', 'hamster', 'dragon']



function getGifs(input) {

    var queryUrl = "https://api.giphy.com/v1/gifs/random?api_key=cLErgx4bKMzmc2s0Ne48b5nSSP4ovxXH&rating=pg-13&tag=" + input;

    for (let i = 0; i < 10; i++) {

        var container = $('#gifContainer');
        container.empty();


        $.ajax({
            url: queryUrl,
            method: 'GET'
        }).then(function (response) {
            console.log(response)



            var image = $('<img>')
                .attr("src", response.data.images.fixed_height_still.url)
                .attr("class", "gifImage")
                .attr("data-still-url", response.data.images.fixed_height_still.url)
                .attr("data-animate-url", response.data.images.fixed_height.url)
                .attr("data-state", 'still');
            container.append(image);


        });

    }
}

function intializeButtons() {

    console.log(tags.length);
    var container = $('#buttonContainer');
    for (let i = 0; i < tags.length; i++) {
        var button = $('<button>')
            .attr('class', "tagButton")
            .attr("data-value", tags[i]).text(tags[i]);
        container.append(button);
    }
}

function addButton(tag) {
    tags.push();
}

function toggleImage(object){
    if(object.attr("data-state") === 'still'){
        object.attr("data-state", 'animate');
        object.attr("src", object.attr("data-animate-url"));
    }else{
        object.attr("data-state", 'still');
        object.attr("src", object.attr("data-still-url"));
    }
}