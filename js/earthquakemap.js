function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: new google.maps.LatLng(2.8, -187.3),
        mapTypeId: 'terrain'
    });
    google.maps.event.trigger(map, 'resize');
}

function populateMap(earthquakePwr){
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: new google.maps.LatLng(2.8, -187.3), // Center Map. Set this to any location that you like
        mapTypeId: 'terrain' // can be any valid type
    });
    // The following uses JQuery library
    $.ajax({
        // The URL of the specific data required
        url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/" + earthquakePwr + ".geojson",

        // Called if there is a problem loading the data
        error: function () {
            $('#info').html('<p>An error has occurred</p>');
        },

        // Called when the data has succesfully loaded
        success: function (data) {
            i = 0;
            var markers = [];
            $.each(data.features, function (key, val) {
                // Get the lat and lng data for use in the markers
                var coords = val.geometry.coordinates;
                var latLng = new google.maps.LatLng(coords[1], coords[0]);
                // Now create a new marker on the map
                var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    label: val.properties.mag.toString()
                });
                var infowindow = new google.maps.InfoWindow({
                    content: "<h3>" + val.properties.title + "</h3><p><a href='location.html'>Details</a></p>"
                });
                marker.addListener('click', function (data) {
                    infowindow.open(map, marker); // Open the Google maps marker infoWindow
                });
                markers[i++] = marker;
            });
            var markerCluster = new MarkerClusterer(map, markers, {
                imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
            });
        }
    });
}


///this one is for all earthquakes in teh last month as errors occur///
function noClusterPopulateMap(earthquakePwr){
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: new google.maps.LatLng(2.8, -187.3), // Center Map. Set this to any location that you like
        mapTypeId: 'terrain' // can be any valid type
    });
    // The following uses JQuery library
    $.ajax({
        // The URL of the specific data required
        url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/" + earthquakePwr + ".geojson",

        // Called if there is a problem loading the data
        error: function () {
            $('#info').html('<p>An error has occurred</p>');
        },

        // Called when the data has succesfully loaded
        success: function (data) {
            i = 0;
            var markers = [];
            $.each(data.features, function (key, val) {
                // Get the lat and lng data for use in the markers
                var coords = val.geometry.coordinates;
                var latLng = new google.maps.LatLng(coords[1], coords[0]);
                // Now create a new marker on the map
                var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    //label: val.properties.mag.toString()
                });
                var infowindow = new google.maps.InfoWindow({
                    content: "<h3>" + val.properties.title + "</h3><p><a href='location.html'>Details</a></p>"
                });
                marker.addListener('click', function (data) {
                    infowindow.open(map, marker); // Open the Google maps marker infoWindow
                });
                markers[i++] = marker;
            });
            var markerCluster = new MarkerClusterer(map, markers, {
                imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
            });
        }
    });
}


$(document).ready(function generateButtons() {

    var btnAll = $('<button/>', {
        text: "All Earthquakes",
        id: "All",
        class: "btn btn-dark",
    });

    var btnOne = $('<button/>', {
        text: "1.0+ Earthquakes",
        id: "m10",
        class: "btn btn-dark",
    });

    var btnTwoFive = $('<button/>', {
        text: "2.5+ Earthquakes",
        id: "m25",
        class: "btn btn-dark",
    });

    var btnFourFive = $('<button/>', {
        text: "4.5+ Earthquakes",
        id: "m45",
        class: "btn btn-dark",
    });

    var btnSig = $('<button/>', {
        text: "Significant",
        id: "Significant",
        class: "btn btn-dark",
    });

    $("#earthquake-buttons").append(btnAll);
    $("#earthquake-buttons").append(btnOne);
    $("#earthquake-buttons").append(btnTwoFive);
    $("#earthquake-buttons").append(btnFourFive);
    $("#earthquake-buttons").append(btnSig);

});



$(document).ready(function () {
    $('#Significant').click(function () {
        if (document.getElementById('Past_Hour').checked) {
            populateMap("significant_hour");
        };
        if (document.getElementById('Past_Day').checked) {
            // Set Google map  to its start state
            populateMap("significant_day");
        };
        if (document.getElementById('Past_Week').checked) {
            populateMap("significant_week");
        };
        if (document.getElementById('Past_Month').checked) {
            populateMap("significant_month");
        };
    });

    $('#m45').click(function () {
        if (document.getElementById('Past_Hour').checked) {
            populateMap("4.5_hour");
        };
        if (document.getElementById('Past_Day').checked) {
            populateMap("4.5_day");

        };
        if (document.getElementById('Past_Week').checked) {
            populateMap("4.5_week");

        };
        if (document.getElementById('Past_Month').checked) {
            populateMap("4.5_month");
        };




    });

    $('#m25').click(function () {
        if (document.getElementById('Past_Hour').checked) {
            populateMap("2.5_hour");

        };
        if (document.getElementById('Past_Day').checked) {
            populateMap("2.5_day");

        };
        if (document.getElementById('Past_Week').checked) {
            populateMap("2.5_week");

        };
        if (document.getElementById('Past_Month').checked) {
            populateMap("2.5_month");

        };
    });

    $('#m10').click(function () {
        if (document.getElementById('Past_Hour').checked) {
            populateMap("1.0_hour");

        };
        if (document.getElementById('Past_Day').checked) {
            populateMap("1.0_day");

        };
        if (document.getElementById('Past_Week').checked) {
            populateMap("1.0_week");

        };
        if (document.getElementById('Past_Month').checked) {
            populateMap("1.0_month");

        };


    });

    $('#All').click(function () {
        if (document.getElementById('Past_Hour').checked) {
            populateMap("all_hour");

        };
        if (document.getElementById('Past_Day').checked) {
            populateMap("all_day");

        };
        if (document.getElementById('Past_Week').checked) {
            populateMap("all_week");

        };
        if (document.getElementById('Past_Month').checked) {
            noClusterPopulateMap("all_month");

        };
    });
});