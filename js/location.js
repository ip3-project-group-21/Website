$(document).ready(function () {
    $('#GoBack').click(function () {
        //localStorage.removeItem( 'CountryData' );
        //location.replace("earthquake.html");
        window.close();
    });
    var myData = JSON.parse(localStorage.getItem('CountryData'));
    if (myData.name == "United States of America") {
        var stateData = JSON.parse(localStorage.getItem('StateData'));
        console.log(stateData);
    }

    //window.localStorage.clear();
    console.log(myData);
    if (myData.name == "United States of America") {
        var stateHeading = $("<h2 />", {
        text: "State"
        });
        
        var state = $("<p />", {
            text: "State Name: " + stateData.results[0].components.state
        });

        var stateTime = $("<p />", {
        text: "Local Timezone: " + stateData.results[0].annotations.timezone.short_name
        });
    }
    var CountryHeading = $("<h2 />", {
        text: "Country"
        });

    var country = $("<p />", {
        text: "Country Name: " + myData.name
    });
    var capital = $("<p />", {
        text: "Capital: " + myData.capital
    });
    var demonym = $("<p />", {
        text: "Demonym: " + myData.demonym
    });
    var continent = $("<p />", {
        text: "Region: " + myData.region
    });
    var subregion = $("<p />", {
        text: "Subregion: " + myData.subregion
    });
    // var timezones = $("<p />", {
    // 	text: ": " + myData.
    // });
    // var borders = $("<p />", {
    // 	text: ": " + myData.
    // });
    // var regionBloc = $("<p />", {
    // 	text: "Capital: " + myData.
    // });
    if (!(myData.name == "United States of America")) {
        $("#Info").append(CountryHeading,country, capital, continent, subregion, demonym);
    } else {
        $("#Info").append(stateHeading,state, stateTime,CountryHeading,country, capital, continent, subregion, demonym);

    }
    var currenciesLength = myData.currencies.length;
    console.log(currenciesLength);
    for (var i = 0; i < currenciesLength; i++) {
        if (myData.currencies[i].symbol == null) {
            var currencies = $("<p />", {
                text: "Main Currency: " + myData.currencies[i].name
            });
            currencies.append("<br>Symbol: (No Symbol Avialable)");
            $("#Info").append(currencies);
        } else {
            var currencies = $("<p />", {
                text: "Main Currency: " + myData.currencies[i].name
            });
            currencies.append("<br>Symbol: " + myData.currencies[i].symbol);
            $("#Info").append(currencies);
        }
    }


    var languagesLength = myData.languages.length;
    console.log(languagesLength);
    for (var i = 0; i < languagesLength; i++) {
        var languages = $("<p />", {
            text: "Language: " + myData.languages[i].name
        });
        $("#Info").append(languages);
    }

    var timesLength = myData.timezones.length;
    console.log(timesLength);
    var time = $("<p />", {
        text: "Timezones:"
    });
    for (var i = 0; i < timesLength; i++) {
        var timezones = $("<li />", {});
        timezones.append(myData.timezones[i]);
        time.append(timezones);
    }
    $("#Info").append(time);

    var bordersLength = myData.borders.length;
    console.log(bordersLength);
    var border = $("<p />", {
        text: "Borders:"
    });
    for (var i = 0; i < bordersLength; i++) {
        var countrycode = myData.borders[i];
        $.ajax({
            type: "GET",
            url: "https://restcountries.eu/rest/v2/alpha/" + countrycode,
            dataType: "json",
            async: false,
            success: function (data) {
                console.log(data);
                var borders = $("<li />", {});
                borders.append(data.name);
                border.append(borders);
            }
        });
    }
    $("#Info").append(border);

    var regionBlocLength = myData.regionalBlocs.length;
    console.log(regionBlocLength);
    for (var i = 0; i < regionBlocLength; i++) {
        var regionalBlocs = $("<p />", {
            text: "Region Bloc(Unions etc): " + myData.regionalBlocs[i].name
        });
        $("#Info").append(regionalBlocs);
    }

    document.getElementById('Flag').src = myData.flag;
    document.getElementById('Flag').alt = myData.name + " Flag";

});