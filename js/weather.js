$(document).ready(function () {

    $("#Latitude").attr("disabled", "disabled");
    $("#Longitude").attr("disabled", "disabled");
    $("#LocationText").attr("disabled", "disabled");
    $("#Submit").attr("disabled", "disabled");

    $("#LatANDLon").click(function () {
        $("#LocationText").attr("disabled", "disabled");
        $("#Latitude").removeAttr('disabled');
        $("#Longitude").removeAttr('disabled');
        $("#Submit").removeAttr('disabled');
        document.getElementById("LocationText").value = "Location";
    });

    $("#Location").click(function () {
        $("#Latitude").attr("disabled", "disabled");
        $("#Longitude").attr("disabled", "disabled");
        $("#LocationText").removeAttr('disabled');
        $("#Submit").removeAttr('disabled');
        document.getElementById("Latitude").value = "Latitude";
        document.getElementById("Longitude").value = "Longitude";
    });



    $("#Submit").click(function () {
        //$('#WeathImage').width(300)
        //$('#WeathImage').height(300);
        
        var location = document.getElementById('LocationText').value;
        $.ajax({
            url: "http://api.apixu.com/v1/current.json?key=75fb86a2371f4abca12115412190403&q=" + location,
            success: function (data) {
                console.log(data);
                image = new Image();
                if (data.error) {
                    image.src = "http://via.placeholder.com/64x64?text=%20"; // Error, so we use blank image for weather. See 'error:' below for another way to include a small blank image
                } else {
                    document.getElementById("WeathImage").src = "http:" + data.current.condition.icon;
                    //image.src = "http:" + data.current.condition.icon; // icon is specified within the data
                    $('#WeathText').html(
                        "<p>Last Updated: " + data.current.last_updated +
                        "<br><br>" +
                        "Location: " + data.location.name + "<br>Region: " + data.location.region + "<br>Country: " + data.location.country +
                        "<br><br>" +
                        "Weather: " + data.current.condition.text + "<br>Visibility(Km):" + data.current.vis_km + "<br>Precipitation(mm):" + data.current.precip_mm +
                        "<br><br>" +
                        "Temperature(C):" + data.current.temp_c + "<br>Feels like Temperature(C):" + data.current.feelslike_c + "<br>Temperature(F):" + data.current.temp_f + "<br>Feels like Temperature(F):" + data.current.feelslike_f +
                        "<br><br>" +
                        "Wind(Mph): " + data.current.wind_mph + "<br>Wind(Kph): " + data.current.wind_kph + "<br>Gusts(Mph): " + data.current.gust_mph + "<br>Gusts(Kph): " + data.current.gust_kph +
                        "</p>"

                        /***
                            + data.location.name + " is " + data.current.condition.text + "<br> " + data.location
                            .region + " " + data.location.country + " " + data.location.lat + " " + data.location.lon + 
                            '</p>'
                            ***/
                    ); // current weather in text format

                }
            },
            error: function () { // Weather service could not provide weather for requested lat,lon world location
                image = new Image();
                // A local 64*64 transparent image. Generated from the useful site: http://png-pixel.com/
                image.src =
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAAPElEQVR42u3OMQEAAAgDIJfc6BpjDyQgt1MVAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBgXbgARTAX8ECcrkoAAAAAElFTkSuQmCC";
                image.onload = function () {
                    //set the image into the web page
                    $('#weatherImage').empty().append(image);
                };
            }
        });



        var latitude = document.getElementById('Latitude').value;
        var longitude = document.getElementById('Longitude').value;

        $.ajax({
            url: "http://api.apixu.com/v1/current.json?key=75fb86a2371f4abca12115412190403&q=" + latitude + "," +
                longitude,
            success: function (data) {
                console.log(data);
                image = new Image();
                if (data.error) {
                    image.src = "http://via.placeholder.com/64x64?text=%20"; // Error, so we use blank image for weather. See 'error:' below for another way to include a small blank image
                } else {
                    document.getElementById("WeathImage").src = "http:" + data.current.condition.icon;
                    //image.src = "http:" + data.current.condition.icon; // icon is specified within the data
                    $('#WeathText').html('<p> ' + data.current.condition.text + "<br> " + data.location.name + " " + data.location
                        .region + " " + data.location.country + '</p>'); // current weather in text format

                }
            },
            error: function () { // Weather service could not provide weather for requested lat,lon world location
                image = new Image();
                // A local 64*64 transparent image. Generated from the useful site: http://png-pixel.com/
                image.src =
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAAPElEQVR42u3OMQEAAAgDIJfc6BpjDyQgt1MVAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBgXbgARTAX8ECcrkoAAAAAElFTkSuQmCC";
                image.onload = function () {
                    //set the image into the web page
                    $('#weatherImage').empty().append(image);
                };
            }
        });

    });
});