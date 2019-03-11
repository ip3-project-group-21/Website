function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: new google.maps.LatLng(2.8, -187.3),
        mapTypeId: 'terrain'
    });
    google.maps.event.trigger(map, 'resize');
}



$(document).ready(function () {
    $('#Significant').click(function () {
        if (document.getElementById('Past_Hour').checked) {
            // Set Google map  to its start state
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 2,
                center: new google.maps.LatLng(2.8, -187.3), // Center Map. Set this to any location that you like
                mapTypeId: 'terrain' // can be any valid type
            });
            // The following uses JQuery library
            $.ajax({
                // The URL of the specific data required
                url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_hour.geojson",

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
                            content: "Work in Progress"
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
        };
        if (document.getElementById('Past_Day').checked) {
            // Set Google map  to its start state
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 2,
                center: new google.maps.LatLng(2.8, -187.3), // Center Map. Set this to any location that you like
                mapTypeId: 'terrain' // can be any valid type
            });
            // The following uses JQuery library
            $.ajax({
                // The URL of the specific data required
                url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_day.geojson",

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
                            content: "Work in Progress"
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
        };
        if (document.getElementById('Past_Week').checked) {
            // Set Google map  to its start state
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 2,
                center: new google.maps.LatLng(2.8, -187.3), // Center Map. Set this to any location that you like
                mapTypeId: 'terrain' // can be any valid type
            });
            // The following uses JQuery library
            $.ajax({
                // The URL of the specific data required
                url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson",

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
                            content: "Work in Progress"
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
        };
        if (document.getElementById('Past_Month').checked) {
            // Set Google map  to its start state
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 2,
                center: new google.maps.LatLng(2.8, -187.3), // Center Map. Set this to any location that you like
                mapTypeId: 'terrain' // can be any valid type
            });
            // The following uses JQuery library
            $.ajax({
                // The URL of the specific data required
                url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson",

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
                            content: "Work in Progress"
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
        };
    });

    $('#m45').click(function () {
        if (document.getElementById('Past_Hour').checked) {
            // Set Google map  to its start state
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 2,
                center: new google.maps.LatLng(2.8, -187.3), // Center Map. Set this to any location that you like
                mapTypeId: 'terrain' // can be any valid type
            });
            // The following uses JQuery library
            $.ajax({
                // The URL of the specific data required
                url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_hour.geojson",

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
                            content: "Work in Progress"
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
        };
        if (document.getElementById('Past_Day').checked) {
            // Set Google map  to its start state
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 2,
                center: new google.maps.LatLng(2.8, -187.3), // Center Map. Set this to any location that you like
                mapTypeId: 'terrain' // can be any valid type
            });
            // The following uses JQuery library
            $.ajax({
                // The URL of the specific data required
                url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson",

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
                            content: "Work in Progress"
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
        };
        if (document.getElementById('Past_Week').checked) {
            // Set Google map  to its start state
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 2,
                center: new google.maps.LatLng(2.8, -187.3), // Center Map. Set this to any location that you like
                mapTypeId: 'terrain' // can be any valid type
            });
            // The following uses JQuery library
            $.ajax({
                // The URL of the specific data required
                url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson",

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
                            content: "Work in Progress"
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
        };
        if (document.getElementById('Past_Month').checked) {
            // Set Google map  to its start state
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 2,
                center: new google.maps.LatLng(2.8, -187.3), // Center Map. Set this to any location that you like
                mapTypeId: 'terrain' // can be any valid type
            });
            // The following uses JQuery library
            $.ajax({
                // The URL of the specific data required
                url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson",

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
                            content: "Work in Progress"
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
        };




    });

    $('#m25').click(function () {
        if (document.getElementById('Past_Hour').checked) {
            // Set Google map  to its start state
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 2,
                center: new google.maps.LatLng(2.8, -187.3), // Center Map. Set this to any location that you like
                mapTypeId: 'terrain' // can be any valid type
            });
            // The following uses JQuery library
            $.ajax({
                // The URL of the specific data required
                url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_hour.geojson",

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
                            content: "Work in Progress"
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
        };
        if (document.getElementById('Past_Day').checked) {
            // Set Google map  to its start state
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 2,
                center: new google.maps.LatLng(2.8, -187.3), // Center Map. Set this to any location that you like
                mapTypeId: 'terrain' // can be any valid type
            });
            // The following uses JQuery library
            $.ajax({
                // The URL of the specific data required
                url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson",

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
                            content: "Work in Progress"
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
        };
        if (document.getElementById('Past_Week').checked) {
            // Set Google map  to its start state
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 2,
                center: new google.maps.LatLng(2.8, -187.3), // Center Map. Set this to any location that you like
                mapTypeId: 'terrain' // can be any valid type
            });
            // The following uses JQuery library
            $.ajax({
                // The URL of the specific data required
                url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson",

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
                            content: "Work in Progress"
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
        };
        if (document.getElementById('Past_Month').checked) {
            // Set Google map  to its start state
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 2,
                center: new google.maps.LatLng(2.8, -187.3), // Center Map. Set this to any location that you like
                mapTypeId: 'terrain' // can be any valid type
            });
            // The following uses JQuery library
            $.ajax({
                // The URL of the specific data required
                url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson",

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
                            content: "Work in Progress"
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
        };
    });

    $('#m10').click(function () {
        if (document.getElementById('Past_Hour').checked) {
            // Set Google map  to its start state
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 2,
                center: new google.maps.LatLng(2.8, -187.3), // Center Map. Set this to any location that you like
                mapTypeId: 'terrain' // can be any valid type
            });
            // The following uses JQuery library
            $.ajax({
                // The URL of the specific data required
                url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_hour.geojson",

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
                            content: "Work in Progress"
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
        if (document.getElementById('Past_Day').checked) {
            // Set Google map  to its start state
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 2,
                center: new google.maps.LatLng(2.8, -187.3), // Center Map. Set this to any location that you like
                mapTypeId: 'terrain' // can be any valid type
            });
            // The following uses JQuery library
            $.ajax({
                // The URL of the specific data required
                url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_day.geojson",

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
                            content: "Work in Progress"
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
        if (document.getElementById('Past_Week').checked) {
            // Set Google map  to its start state
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 2,
                center: new google.maps.LatLng(2.8, -187.3), // Center Map. Set this to any location that you like
                mapTypeId: 'terrain' // can be any valid type
            });
            // The following uses JQuery library
            $.ajax({
                // The URL of the specific data required
                url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson",

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
                            content: "Work in Progress"
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
        if (document.getElementById('Past_Month').checked) {
            // Set Google map  to its start state
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 2,
                center: new google.maps.LatLng(2.8, -187.3), // Center Map. Set this to any location that you like
                mapTypeId: 'terrain' // can be any valid type
            });
            // The following uses JQuery library
            $.ajax({
                // The URL of the specific data required
                url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_month.geojson",

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
                            content: "Work in Progress"
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


    });

    $('#All').click(function () {
        if (document.getElementById('Past_Hour').checked) {
            // Set Google map  to its start state
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 2,
                center: new google.maps.LatLng(2.8, -187.3), // Center Map. Set this to any location that you like
                mapTypeId: 'terrain' // can be any valid type
            });
            // The following uses JQuery library
            $.ajax({
                // The URL of the specific data required
                url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson",

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
                            content: "Work in Progress"
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
        };
        if (document.getElementById('Past_Day').checked) {
            // Set Google map  to its start state
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 2,
                center: new google.maps.LatLng(2.8, -187.3), // Center Map. Set this to any location that you like
                mapTypeId: 'terrain' // can be any valid type
            });
            // The following uses JQuery library
            $.ajax({
                // The URL of the specific data required
                url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson",

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
                            content: "Work in Progress"
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
        };
        if (document.getElementById('Past_Week').checked) {
            // Set Google map  to its start state
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 2,
                center: new google.maps.LatLng(2.8, -187.3), // Center Map. Set this to any location that you like
                mapTypeId: 'terrain' // can be any valid type
            });
            // The following uses JQuery library
            $.ajax({
                // The URL of the specific data required
                url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson",

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
                            content: "Work in Progress"
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
        };
        if (document.getElementById('Past_Month').checked) {
            // Set Google map  to its start state
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 2,
                center: new google.maps.LatLng(2.8, -187.3), // Center Map. Set this to any location that you like
                mapTypeId: 'terrain' // can be any valid type
            });
            // The following uses JQuery library
            $.ajax({
                // The URL of the specific data required
                url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",

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
                            content: "Work in Progress"
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
        };
    });
});