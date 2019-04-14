//function to clear the text inside lat and long text boxes
function clearLatLon(){
    document.getElementById('Latitude').value = '';
    document.getElementById('Longitude').value = '';
}

//function to clear the text inside location text box
function clearLoc(){
    document.getElementById('LocationText').value = '';
}


//this function will get the weather data and show it to the user
function getWeather(data) {

    document.getElementById("WeathImage").style.visibility = "visible";
    document.getElementById("WeathImage2").style.visibility = "visible";
    document.getElementById("WeathImage3").style.visibility = "visible";
    document.getElementById("WeathImage").src = "https:" + data.current.condition.icon;
    document.getElementById("WeathImage2").src = "https:" + data.forecast.forecastday[1].day.condition.icon;
    document.getElementById("WeathImage3").src = "https:" + data.forecast.forecastday[2].day.condition.icon;

    //Location information variables
    var loc = $("<h4 />", {
        text: "Location Name: " + data.location.name
    });

    var reg = $("<h4 />", {
        text: "Region: " + data.location.region
    });

    var country = $("<h4 />", {
        text: "Country: " + data.location.country
    });
    //Location information variables

    //Todays forecast variables
    var lastUpdatedBold = $("<b />", {
        text: "Today (" + data.current.last_updated + ")"
    });

    var lastUpdated = $("<h5 />", {});

    lastUpdated.append(lastUpdatedBold);

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
    //Todays forecast variables

    //Tomorrows forecast variables
    var tomorrowDateBold = $("<b />", {
        text: "Tomorrow (" + data.forecast.forecastday[1].date + ")"
    });

    var tomorrowDate = $("<h5 />", {});

    tomorrowDate.append(tomorrowDateBold);

    var tmrwDesc = $("<li />", {
        text: "Condition: " + data.forecast.forecastday[1].day.condition.text
    });

    var tmrwMaxTemp = $("<li />", {
        text: "Max Temperature (C): " + data.forecast.forecastday[1].day.maxtemp_c + "°"
    });

    var tmrwMinTemp = $("<li />", {
        text: "Min Temperature (C): " + data.forecast.forecastday[1].day.mintemp_c + "°"
    });

    var tmrwAvgTemp = $("<li />", {
        text: "Avg Temperature (C): " + data.forecast.forecastday[1].day.avgtemp_c + "°"
    });

    var tmrwMaxWind = $("<li />", {
        text: "Max Wind Speed (MPH): " + data.forecast.forecastday[1].day.maxwind_mph
    });

    var tmrwTotalPrecip = $("<li />", {
        text: "Total Precipitation (MM): " + data.forecast.forecastday[1].day.totalprecip_mm
    });

    var tmrwAvgVis = $("<li />", {
        text: "Average Visibility (Miles): " + data.forecast.forecastday[1].day.avgvis_miles
    });

    var tmrwAvgHum = $("<li />", {
        text: "Average Humidity: " + data.forecast.forecastday[1].day.avghumidity
    });

    var tmrwSunrise = $("<li />", {
        text: "Sunrise: " + data.forecast.forecastday[1].astro.sunrise
    });

    var tmrwSunset = $("<li />", {
        text: "Sunset: " + data.forecast.forecastday[1].astro.sunset
    });
    //Tomorrows forecast variables

    //Next again days forecast variables
    var nextAgainDateBold = $("<b />", {
        text: "Next Again Day (" + data.forecast.forecastday[2].date + ")"
    });

    var nextAgainDate = $("<h5 />", {});

    nextAgainDate.append(nextAgainDateBold);

    var nadDesc = $("<li />", {
        text: "Condition: " + data.forecast.forecastday[2].day.condition.text
    });

    var nadMaxTemp = $("<li />", {
        text: "Max Temperature (C): " + data.forecast.forecastday[2].day.maxtemp_c + "°"
    });

    var nadMinTemp = $("<li />", {
        text: "Min Temperature (C): " + data.forecast.forecastday[2].day.mintemp_c + "°"
    });

    var nadAvgTemp = $("<li />", {
        text: "Avg Temperature (C): " + data.forecast.forecastday[2].day.avgtemp_c + "°"
    });

    var nadMaxWind = $("<li />", {
        text: "Max Wind Speed (MPH): " + data.forecast.forecastday[2].day.maxwind_mph
    });

    var nadTotalPrecip = $("<li />", {
        text: "Total Precipitation (MM): " + data.forecast.forecastday[2].day.totalprecip_mm
    });

    var nadAvgVis = $("<li />", {
        text: "Average Visibility (Miles): " + data.forecast.forecastday[2].day.avgvis_miles
    });

    var nadAvgHum = $("<li />", {
        text: "Average Humidity: " + data.forecast.forecastday[2].day.avghumidity
    });

    var nadSunrise = $("<li />", {
        text: "Sunrise: " + data.forecast.forecastday[2].astro.sunrise
    });

    var nadSunset = $("<li />", {
        text: "Sunset: " + data.forecast.forecastday[2].astro.sunset
    });
    //Next again days forecast variables

    //Location information appendages
    $("#weathLocationInfo").append(loc);
    $("#weathLocationInfo").append(reg);
    $("#weathLocationInfo").append(country);
    //Location information appendages

    //Todays weather appendages
    $("#weathTextList").append(lastUpdated);
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
    //Todays weather appendages

    //Tomorrows weather appendages
    $('#List2').append(tomorrowDate);
    $('#List2').append(tmrwDesc);
    $('#List2').append(tmrwMaxTemp);
    $('#List2').append(tmrwMinTemp);
    $('#List2').append(tmrwAvgTemp);
    $('#List2').append(tmrwMaxWind);
    $('#List2').append(tmrwTotalPrecip);
    $('#List2').append(tmrwAvgVis);
    $('#List2').append(tmrwAvgHum);
    $('#List2').append(tmrwSunrise);
    $('#List2').append(tmrwSunset);
    //Tomorrows weather appendages

    //Next again day weather appendages
    $('#List3').append(nextAgainDate);
    $('#List3').append(nadDesc);
    $('#List3').append(nadMaxTemp);
    $('#List3').append(nadMinTemp);
    $('#List3').append(nadAvgTemp);
    $('#List3').append(nadMaxWind);
    $('#List3').append(nadTotalPrecip);
    $('#List3').append(nadAvgVis);
    $('#List3').append(nadAvgHum);
    $('#List3').append(nadSunrise);
    $('#List3').append(nadSunset);
    //Next again day weather appendages
} //end of getWeather function

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

        $("#weathTextList").empty();
        $("#List2").empty();
        $("#List3").empty();
        $("#weathLocationInfo").empty(); // Clears the li elements under the UL when button clicked. Otherwise data gets muddled together. Source - https://stackoverflow.com/questions/6941489/how-does-one-remove-all-li-tags-from-a-parent-ul-tag

        // Additional source to check if the text box was disabled to help program decide which if statement to execute - https://stackoverflow.com/questions/8963781/find-if-a-textbox-is-disabled-or-not-using-jquery

        if ($("#LocationText").prop('disabled') == false) {

            var location = document.getElementById('LocationText').value;

            console.log(location);

            $.ajax({

                url: "https://api.apixu.com/v1/forecast.json?key=75fb86a2371f4abca12115412190403&q=" + location + "&days=3",

                error: function () {
                    document.getElementById("WeathImage").style.visibility = "hidden";
                    document.getElementById("WeathImage2").style.visibility = "hidden";
                    document.getElementById("WeathImage3").style.visibility = "hidden";
                    alert("Issue obtaining API data. Please enter a proper location.");
                },

                success: function (data) {

                    if (data.location.name == titleCase(location) || data.location.region == titleCase(location) || data.location.country == titleCase(location)) {

                        //calling the getWeather function
                        getWeather(data);

                    } else {
                        var unsuccessful = $("<h3 />", {
                            text: "No matching data - please ensure the data you entered is the location or region."
                        });

                        $("#List2").append(unsuccessful);

                        document.getElementById("WeathImage").style.visibility = "hidden";
                        document.getElementById("WeathImage2").style.visibility = "hidden";
                        document.getElementById("WeathImage3").style.visibility = "hidden";
                    }
                }

            });
        }

        if ($("#Longitude").prop('disabled') == false && $("#Latitude").prop('disabled') == false) {

            var longitude = document.getElementById('Longitude').value;
            var latitude = document.getElementById('Latitude').value;


            $.ajax({

                url: "https://api.apixu.com/v1/forecast.json?key=75fb86a2371f4abca12115412190403&q=" + latitude + "," + longitude + "&days=3",

                error: function () {
                    document.getElementById("WeathImage").style.visibility = "hidden";
                    document.getElementById("WeathImage2").style.visibility = "hidden";
                    document.getElementById("WeathImage3").style.visibility = "hidden";
                    alert("Issue obtaining API data. Please enter a proper Longitude and Latitude.");

                },

                success: function (data) {


                    if (data.location.lon == longitude || data.location.lat == latitude) {

                        //calling getWeather function
                        getWeather(data);

                    } else {
                        var unsuccessful = $("<h3 />", {
                            text: "No matching data - please ensure the co-ordinates you enter exist and are numerical."
                        });

                        $("#List2").append(unsuccessful);

                        document.getElementById("WeathImage").style.visibility = "hidden";
                        document.getElementById("WeathImage2").style.visibility = "hidden";
                        document.getElementById("WeathImage3").style.visibility = "hidden";
                    }
                }

            });

        }

    });

});