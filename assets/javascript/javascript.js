getGifs('cat');


function getGifs(input) {

    var queryUrl = "https://api.giphy.com/v1/gifs/random?api_key=cLErgx4bKMzmc2s0Ne48b5nSSP4ovxXH&tag=" + input;

    for (let i = 0; i < 10; i++) {

        $.ajax({
            url: queryUrl,
            method: 'GET'
        }).then(function (response) {
            console.log(response)

            var container = $('#gifContainer');

            var image = $('<img>').attr("src", response.data.images.fixed_height_still.url);
            container.append(image);


        });

    }



}