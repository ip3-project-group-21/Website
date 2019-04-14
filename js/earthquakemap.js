function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: new google.maps.LatLng(2.8, -187.3),
        mapTypeId: 'terrain'
    });
    google.maps.event.trigger(map, 'resize');
}

function populateMap(earthquakePwr) {
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
                //if statement to replace any null magnitudes with a zero
                if (val.properties.mag === null)
                {
                    val.properties.mag = 0;
                }
                var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    label: val.properties.mag.toString()
                });
                /*                var point = new google.maps.LatLng(
                                   parseFloat(markers[i].getAttribute("lat")),
                                   parseFloat(markers[i].getAttribute("lng"))); */
                var infowindow = new google.maps.InfoWindow({
                    content: "<h3>" + val.properties.title + "</h3><p><a class='.infoclick' href='javascript:locationInfo(" + coords[1] + "," + coords[0] + ")'>Details</a></p>"
                });
                marker.addListener('click', function (data) {
                    infowindow.open(map, marker); // Open the Google maps marker infoWindow location.html
                });
                markers[i++] = marker;
            });
            var markerCluster = new MarkerClusterer(map, markers, {
                imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
            });
        }
    });
}

function locationInfo(lat, long) {
    //var redirectWindow  = window.open('location.html', '_blank');
    $.ajax({
        type: "GET",
        url: "https://secure.geonames.org/countrySubdivisionJSON?lat=" + lat + "&lng=" + long + "&username=rballa201",
        dataType: "json",
        success: function (data) {
            console.log(data);

            if (typeof data.status === 'undefined')
            {
            if (data.countryName == "United States") {
                var countrycode = data.countryCode;
                var countryname = data.countryName;
                /*             var stateCode = data.adminCode1;
                            var stateName = data.adminName1; */
                //console.log(countrycode);
                console.log(countryname);
                /*             console.log(stateCode);
                            console.log(stateName); */
                $.ajax({
                    type: "GET",
                    url: "https://restcountries.eu/rest/v2/alpha/" + countrycode,
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                        var CountryData = data;
                        //localStorage.removeItem( 'CountryData' );
                        localStorage.setItem('CountryData', JSON.stringify(CountryData));
                        setTimeout(1000);
                        window.open('location.html', '_blank');
                    }
                });
            }
            else{
                var countrycode = data.countryCode;
                var countryname = data.countryName;
                //console.log(countrycode);
                //console.log(countryname);
                $.ajax({
                    type: "GET",
                    url: "https://restcountries.eu/rest/v2/alpha/" + countrycode,
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        console.log(data);
                        var CountryData = data;
                        //localStorage.removeItem( 'CountryData' );
                        localStorage.setItem('CountryData', JSON.stringify(CountryData));
                        setTimeout(100);
                        window.open('location.html', '_blank');
                    }
                });
            }
            }
            else
            {
                alert("Area is on a Body of Water. No Data is Avialable");
            }
            /*  var queryString = "?para1=" + value1 + "&para2=" + value2;
             window.location.href = "page2.html" + queryString; */

        },
        //complete: function (data) {}

    });
};

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
    localStorage.clear();
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
            populateMap("all_month");

        };
    });
});