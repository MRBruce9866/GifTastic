$(document).ready(function () {

    intializeButtons();

    $('#buttonContainer').on("click", ".tagButton", function () {
        getGifs($(this).attr("data-value"));
    })

    $('#gifContainer').on("click", ".gifImage", function () {
        toggleImage($(this));
    })

    $('#submitBtn').on("click", function (event) {

        event.preventDefault();

        var input = $('#tagInput').val().trim();

        if (input !== "") {
            addButton(input);
            getGifs(input);
        }

    })




});



var tags = ['cat', 'dog', 'snake', 'fish', 'raccoon', 'bear', 'lion', 'bird', 'lizard', 'panther', 'mouse', 'hamster', 'dragon']



function getGifs(input) {

    var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=cLErgx4bKMzmc2s0Ne48b5nSSP4ovxXH&q=" + input + "&limit=10&offset=0&rating=PG-13&lang=en"


    var container = $('#gifContainer');
    container.empty();


    $.ajax({
        url: queryUrl,
        method: 'GET'
    }).then(function (response) {
        console.log(response)


        for (let i = 0; i < response.data.length; i++) {
            // var rating = $('<p>').text("Rating: " + response.data[i].rating);

            var card = createCard(response.data[i]);

            container.prepend(card);

        }

    });
}

function createCard(record){

   

    var newDiv = $('<div>').attr("class", "imageContainer m-3")

    var t = record.title.substr(0, record.title.indexOf("GIF")).trim();

    if(t.length <=0) t = "untitled"
    var title = $('<h3>').text(t);
    var hr = $('<hr>')
    var img = $('<img>').addClass("gifImage")
    .attr("src", record.images.fixed_height_still.url)
    .attr("data-still-url", record.images.fixed_height_still.url)
    .attr("data-animate-url", record.images.fixed_height.url)
    .attr("data-state", 'still');

    var rating = $('<h5>').text("Rating: " + record.rating);

    newDiv.append(title).append(title).append(hr).append(img).append(rating);


    

    return newDiv;

    
}

function intializeButtons() {

    console.log(tags.length);
    var container = $('#buttonContainer');
    for (let i = 0; i < tags.length; i++) {
        var button = $('<button>')
            .attr('class', "tagButton")
            .attr("data-value", tags[i])
            .text(tags[i]);
        container.append(button);
    }
}

function addButton(tag) {
    tags.push();

    console.log(tags.length);
    var container = $('#buttonContainer');
    var button = $('<button>')
        .attr('class', "tagButton")
        .attr("data-value", tag)
        .text(tag);
    container.append(button);



}

function toggleImage(object) {
    if (object.attr("data-state") === 'still') {
        object.attr("data-state", 'animate');
        object.attr("src", object.attr("data-animate-url"));
    } else {
        object.attr("data-state", 'still');
        object.attr("src", object.attr("data-still-url"));
    }
}