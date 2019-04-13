    $(document).ready(function () {
        google.charts.load('current', {
            'packages': ['corechart'],
            // Note: you will need to get a mapsApiKey for your project.
            // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
            'mapsApiKey': 'AIzaSyAYmsRSnEUBTBaLIEfT64IZ1Gtnny-5wcs'
        });

        google.charts.setOnLoadCallback(drawRegionsMap);


        $(window).on('resize', function (event) {
            drawRegionsMap();
        });


        var CountryName = [];
        var CountryCode = [];
        var CountryPopulation = [];
        $.ajax({
            type: "GET",
            url: "https://restcountries.eu/rest/v2/all",
            dataType: "json",
            success: function (data) {
                console.log(data);
                var arrayLength = data.length;
                console.log(arrayLength);

                for (var i = 0; i < arrayLength; i++) {

                    CountryName[i] = data[i].name;
                    CountryCode[i] = data[i].alpha2Code;
                    CountryPopulation[i] = data[i].population;


                    /* 	var Information = $("<div />");
                        Information.append(CountryName).append(CountryPopulation);
                        $("#chart").append(Information); */
                }
            }
        });

        function drawRegionsMap() {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Country Code:');
            data.addColumn('string', 'Country Name:');
            data.addColumn('number', 'Population');

            for (i = 0; i < CountryName.length; i++) {
                data.addRow([CountryCode[i], CountryName[i], CountryPopulation[i]]);
            }
            var options = {
                width: '70%',
                height: '70%',
                colorAxis: {
                    minValue: 100000,
                    maxValue: 50000000,
                    colors: ['#FFA07A', '#DC143C'],
                },
                tooltip: {
                    trigger: 'hover'
                },
                tooltip: {
                    //isHtml: true
                },
                /* chartArea: {
                    left: "25%",
                    top: "3%",
                    height: "80%",
                    width: "100%"
                }, */
                //backgroundColor: 'transparent',
                keepAspectRatio: false,
                //width: 900,
                //height: 900

            };


            var chart = new google.visualization.GeoChart(document.getElementById('chart'));
            new google.visualization.events.addListener(chart, 'select', function () {
                try {
                    var selection = chart.getSelection();
                    var selectedRow = selection[0].row;
                    var selectedRegionCode = data.getValue(selectedRow, 0);
                    $.ajax({
                        type: "GET",
                        url: "https://restcountries.eu/rest/v2/alpha/" + selectedRegionCode,
                        dataType: "json",
                        async: false,
                        success: function (data) {
                            //console.log(data);
                            //localStorage.removeItem( 'CountryData' );
                            //alert("Country Name: " + data.name);
                            var modal = document.getElementById('myModal');
                            $("#Info").html("");

                            // Get the button that opens the modal
                            var country = data.name;
                            $('#MHeader').text(country);
                            
                            //header.html(country);

                            var capital = $("<p />", {
                                text: "Capital: " + data.capital
                            });
                            var demonym = $("<p />", {
                                text: "Demonym: " + data.demonym
                            });
                            var continent = $("<p />", {
                                text: "Region: " + data.region
                            });
                            var subregion = $("<p />", {
                                text: "Subregion: " + data.subregion
                            });
                            // var timezones = $("<p />", {
                            // 	text: ": " + data.
                            // });
                            // var borders = $("<p />", {
                            // 	text: ": " + data.
                            // });
                            // var regionBloc = $("<p />", {
                            // 	text: "Capital: " + data.
                            // });

                            $("#Info").append(capital, continent, subregion, demonym);
                            var currenciesLength = data.currencies.length;
                            console.log(currenciesLength);
                            for (var i = 0; i < currenciesLength; i++) {
                                if (data.currencies[i].symbol == null) {
                                    var currencies = $("<p />", {
                                        text: "Main Currency: " + data.currencies[i].name
                                    });
                                    currencies.append("<br>Symbol: (No Symbol Avialable)");
                                    $("#Info").append(currencies);
                                } else {
                                    var currencies = $("<p />", {
                                        text: "Main Currency: " + data.currencies[i].name
                                    });
                                    currencies.append("<br>Symbol: " + data.currencies[i].symbol);
                                    $("#Info").append(currencies);
                                }
                            }


                            var languagesLength = data.languages.length;
                            console.log(languagesLength);
                            for (var i = 0; i < languagesLength; i++) {
                                var languages = $("<p />", {
                                    text: "Language: " + data.languages[i].name
                                });
                                $("#Info").append(languages);
                            }

                            var timesLength = data.timezones.length;
                            console.log(timesLength);
                            var time = $("<p />", {
                                text: "Timezones:"
                            });
                            for (var i = 0; i < timesLength; i++) {
                                var timezones = $("<li />", {});
                                timezones.append(data.timezones[i]);
                                time.append(timezones);
                            }
                            $("#Info").append(time);


                            var regionBlocLength = data.regionalBlocs.length;
                            console.log(regionBlocLength);
                            for (var i = 0; i < regionBlocLength; i++) {
                                var regionalBlocs = $("<p />", {
                                    text: "Region Bloc(Unions etc): " + data.regionalBlocs[i].name
                                });
                                $("#Info").append(regionalBlocs);
                            }

                            document.getElementById('Flag').src = data.flag;
                            document.getElementById('Flag').alt = data.name + " Flag";

                            // Get the <span> element that closes the modal
                            var span = document.getElementsByClassName("close")[0];

                            // When the user clicks the button, open the modal 
                            modal.style.display = "block";

                            // When the user clicks on <span> (x), close the modal
                            span.onclick = function () {
                                modal.style.display = "none";
                            }

                            // When the user clicks anywhere outside of the modal, close it
                            window.onclick = function (event) {
                                if (event.target == modal) {
                                    modal.style.display = "none";
                                }
                            }

                        }
                    });
                } catch (err) {}
            });

            chart.draw(data, options);
            /* 				$(window).resize(function () {
                            var view = new google.visualization.DataView(data);
                            chart.draw(view, options);
                        }); */
        }

    });