$(document).ready(function () {

    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        // Directly return the joined string
        return splitStr.join(' ');
    }

    $("#Latitude").attr("disabled", "disabled");
    $("#Longitude").attr("disabled", "disabled");
    $("#LocationText").attr("disabled", "disabled");
    $("#Submit").attr("disabled", "disabled");

    $("#LatANDLon").click(function () {
        $("#LocationText").attr("disabled", "disabled");
        $("#Latitude").removeAttr('disabled');
        $("#Longitude").removeAttr('disabled');
        $("#Submit").removeAttr('disabled');
    });

    $("#Location").click(function () {
        $("#Latitude").attr("disabled", "disabled");
        $("#Longitude").attr("disabled", "disabled");
        $("#LocationText").removeAttr('disabled');
        $("#Submit").removeAttr('disabled');
    });

    $("#submitBtn").click(function () {

        $("#weathTextList").empty(); // Clears the li elements under the UL when button clicked. Otherwise data gets muddled together. Source - https://stackoverflow.com/questions/6941489/how-does-one-remove-all-li-tags-from-a-parent-ul-tag

        // Additional source to check if the text box was disabled to help program decide which if statement to execute - https://stackoverflow.com/questions/8963781/find-if-a-textbox-is-disabled-or-not-using-jquery

        if ($("#LocationText").prop('disabled') == false) {

            var location = document.getElementById('LocationText').value;

            console.log(location);

            $.ajax({

                url: "http://api.apixu.com/v1/current.json?key=75fb86a2371f4abca12115412190403&q=" + location,

                error: function () {

                    alert("Issue obtaining API data. Please enter a proper location.");

                },

                success: function (data) {

                    if (data.location.name == titleCase(location) || data.location.region == titleCase(location) || data.location.country == titleCase(location)) {


                        document.getElementById("WeathImage").src = "http:" + data.current.condition.icon;

                        var lastUpdated = $("<li />", {
                            text: "Last Updated: " + data.current.last_updated
                        });

                        var loc = $("<li />", {
                            text: "Location Name: " + data.location.name
                        });

                        var reg = $("<li />", {
                            text: "Region: " + data.location.region
                        });

                        var country = $("<li />", {
                            text: "Country: " + data.location.country
                        });

                        var weathCond = $("<li />", {
                            text: "Current Condition: " + data.current.condition.text
                        });

                        var vis = $("<li />", {
                            text: "Current Visibility: " + data.current.vis_km + " km"
                        });

                        var perc = $("<li />", {
                            text: "Current Precipitation: " + data.current.precip_mm + " mm"
                        });

                        var tempC = $("<li />", {
                            text: "Current Temparature (C): " + data.current.temp_c + " C"
                        });

                        var feelsLikeC = $("<li />", {
                            text: "Feels Like: " + data.current.feelslike_c + " C"
                        });

                        var tempF = $("<li />", {
                            text: "Current Temparature (F): " + data.current.temp_f + " F"
                        });

                        var feelsLikeF = $("<li />", {
                            text: "Feels Like: " + data.current.feelslike_f + " F"
                        });

                        var windMPH = $("<li />", {
                            text: "Wind (MPH): " + data.current.wind_mph + " mph"
                        });

                        var windKPH = $("<li />", {
                            text: "Wind (KPH): " + data.current.wind_kph + " kph"
                        });

                        var gustMPH = $("<li />", {
                            text: "Gusts (MPH): " + data.current.gust_mph + " mph"
                        });

                        var gustKPH = $("<li />", {
                            text: "Gusts (KPH): " + data.current.gust_kph + " kph"
                        });


                        /*data.location.name + " is " + data.current.condition.text + "<br> " + data.location
                            .region + " " + data.location.country + " " + data.location.lat + " " + data.location.lon +
                            '</p>'*/

                        /** this code above was in ryans code twice not sure if you need it. Only thing not above is the lat & lon vars
                         *  ALSO RYAN ALL YOU HAD TO DO WAS LOOK AT OUR WORK FROM WEB LAST SEMESTER!!!!!
                         */

                        $("#weathTextList").append(lastUpdated);
                        $("#weathTextList").append(loc);
                        $("#weathTextList").append(reg);
                        $("#weathTextList").append(country);
                        $("#weathTextList").append(weathCond);
                        $("#weathTextList").append(vis);
                        $("#weathTextList").append(perc);
                        $("#weathTextList").append(tempC);
                        $("#weathTextList").append(feelsLikeC);
                        $("#weathTextList").append(tempF);
                        $("#weathTextList").append(feelsLikeF);
                        $("#weathTextList").append(windMPH);
                        $("#weathTextList").append(windKPH);
                        $("#weathTextList").append(gustMPH);
                        $("#weathTextList").append(gustKPH);

                    } else {
                        var unsuccessful = $("<li />", {
                            text: "THIS HAS WORKED, BUT NOT FOUND A SIMILAR CO-ORD"
                        });

                        $("#weathTextList").append(unsuccessful);
                    }
                }

            });
        }

        if ($("#Longitude").prop('disabled') == false && $("#Latitude").prop('disabled') == false) {

            var longitude = document.getElementById('Longitude').value;
            var latitude = document.getElementById('Latitude').value;


            $.ajax({

                url: "http://api.apixu.com/v1/current.json?key=75fb86a2371f4abca12115412190403&q=" + latitude + "," +
                    longitude,

                error: function () {

                    alert("Issue obtaining API data. Please enter a proper Longitude and Latitude.");

                },

                success: function (data) {


                    if (data.location.lon == longitude || data.location.lat == latitude) {



                        document.getElementById("WeathImage").src = "http:" + data.current.condition.icon;


                        var lastUpdated = $("<li />", {
                            text: "Last Updated: " + data.current.last_updated
                        });

                        var loc = $("<li />", {
                            text: "Location Name: " + data.location.name
                        });

                        var reg = $("<li />", {
                            text: "Region: " + data.location.region
                        });

                        var lon = $("<li />", {
                            text: "Longitude: " + data.location.lon
                        });

                        var lat = $("<li />", {
                            text: "Latitude: " + data.location.lat
                        });

                        var country = $("<li />", {
                            text: "Country: " + data.location.country
                        });

                        var weathCond = $("<li />", {
                            text: "Current Condition: " + data.current.condition.text
                        });

                        var vis = $("<li />", {
                            text: "Current Visibiility: " + data.current.vis_km + " km"
                        });

                        var perc = $("<li />", {
                            text: "Current Precipitation: " + data.current.precip_mm + " mm"
                        });

                        var tempC = $("<li />", {
                            text: "Current Temparature (C): " + data.current.temp_c + " C"
                        });

                        var feelsLikeC = $("<li />", {
                            text: "Feels Like: " + data.current.feelslike_c + " C"
                        });

                        var tempF = $("<li />", {
                            text: "Current Temparature (F): " + data.current.temp_f + " F"
                        });

                        var feelsLikeF = $("<li />", {
                            text: "Feels Like: " + data.current.feelslike_f + " F"
                        });

                        var windMPH = $("<li />", {
                            text: "Wind (MPH): " + data.current.wind_mph + " mph"
                        });

                        var windKPH = $("<li />", {
                            text: "Wind (KPH): " + data.current.wind_kph + " kph"
                        });

                        var gustMPH = $("<li />", {
                            text: "Gusts (MPH): " + data.current.gust_mph + " mph"
                        });

                        var gustKPH = $("<li />", {
                            text: "Gusts (KPH): " + data.current.gust_kph + " kph"
                        });

                        $("#weathTextList").append(lastUpdated);
                        $("#weathTextList").append(loc);
                        $("#weathTextList").append(reg);

                        $("#weathTextList").append(lon);
                        $("#weathTextList").append(lat);

                        $("#weathTextList").append(country);
                        $("#weathTextList").append(weathCond);
                        $("#weathTextList").append(vis);
                        $("#weathTextList").append(perc);
                        $("#weathTextList").append(tempC);
                        $("#weathTextList").append(feelsLikeC);
                        $("#weathTextList").append(tempF);
                        $("#weathTextList").append(feelsLikeF);
                        $("#weathTextList").append(windMPH);
                        $("#weathTextList").append(windKPH);
                        $("#weathTextList").append(gustMPH);
                        $("#weathTextList").append(gustKPH);

                        // RYAN YOU DIDNT EVEN FINISH THIS ONLY HAD THE FIRST 4 VARIABLES. THIS AJAX CALL SHOULD BE SAME AS THE ONE FOR LOCATION, ONLY DIFF IS THIS ONE USES LAT AND LONG.

                    } else {
                        var unsuccessful = $("<li />", {
                            text: "THIS HAS WORKED, BUT NOT FOUND A SIMILAR CO-ORD"
                        });

                        $("#weathTextList").append(unsuccessful);
                    }
                }


            });

        }

    });

});