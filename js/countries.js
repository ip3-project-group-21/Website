    $(document).ready(function () {

        //Load Google Charts
        google.charts.load('current', {
            'packages': ['corechart'],
            'mapsApiKey': 'AIzaSyAYmsRSnEUBTBaLIEfT64IZ1Gtnny-5wcs'
        });

        //Set Function for Chart Drawing
        google.charts.setOnLoadCallback(drawRegionsMap);

        //Redraw Chart when window/page resizes
        $(window).on('resize', function (event) {
            drawRegionsMap();
        });

        //Chart Variables
        var CountryName = [];
        var CountryCode = [];
        var CountryPopulation = [];

        //API Call - Countries and their Population
        $.ajax({
            type: "GET",
            url: "https://restcountries.eu/rest/v2/all",
            dataType: "json",
            success: function (data) {
                var arrayLength = data.length;

                //Store Country Data
                for (var i = 0; i < arrayLength; i++) {
                    CountryName[i] = data[i].name;
                    CountryCode[i] = data[i].alpha2Code;
                    CountryPopulation[i] = data[i].population;
                }
            }
        });

        //Function to Draw GeoChart
        function drawRegionsMap() {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Country Code:');
            data.addColumn('string', 'Country Name:');
            data.addColumn('number', 'Population');

            //Add Data to Chart
            for (i = 0; i < CountryName.length; i++) {
                data.addRow([CountryCode[i], CountryName[i], CountryPopulation[i]]);
            }
            //Chart Options
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
                keepAspectRatio: false,
            };

            //Set Chart Draw Location
            var chart = new google.visualization.GeoChart(document.getElementById('chart'));

            //Click event for chart - Display Modal with More Information
            new google.visualization.events.addListener(chart, 'select', function () {
                try {
                    //Obtain country Data from country clicked
                    var selection = chart.getSelection();
                    var selectedRow = selection[0].row;
                    var selectedRegionCode = data.getValue(selectedRow, 0);
                    chart.setSelection([]);

                    //APi Call - Obtain Information about selected country
                    $.ajax({
                        type: "GET",
                        url: "https://restcountries.eu/rest/v2/alpha/" + selectedRegionCode,
                        dataType: "json",
                        async: false,
                        success: function (data) {

                            //Obatin Modal html and clear the Information on it
                            var modal = document.getElementById('myModal');
                            $("#Info").html("");

                            // Get the button that opens the modal
                            var country = data.name;

                            //Set Modal Header to Country Name
                            $('#MHeader').text(country);

                            //Create Country Display Variables
                            var population = $("<p />", {
                                text: "Population: " + data.population.toLocaleString("en")
                            });

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

                            //Append Data to Modal
                            $("#Info").append(population, capital, continent, subregion, demonym);

                            //Create Currency Display Variables and Append to Modal
                            var currenciesLength = data.currencies.length;
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

                            //Create Language Display Variables and Append to Modal
                            var languagesLength = data.languages.length;
                            for (var i = 0; i < languagesLength; i++) {
                                var languages = $("<p />", {
                                    text: "Language: " + data.languages[i].name
                                });
                                $("#Info").append(languages);
                            }

                            //Create Timezone Display Variables and Append to Modal
                            var timesLength = data.timezones.length;
                            var time = $("<p />", {
                                text: "Timezones:"
                            });
                            for (var i = 0; i < timesLength; i++) {
                                var timezones = $("<li />", {});
                                timezones.append(data.timezones[i]);
                                time.append(timezones);
                            }
                            $("#Info").append(time);

                            //Create Region Blocs (Unions etc) Display Variables and Append to Modal
                            var regionBlocLength = data.regionalBlocs.length;
                            for (var i = 0; i < regionBlocLength; i++) {
                                var regionalBlocs = $("<p />", {
                                    text: "Region Bloc(Unions etc): " + data.regionalBlocs[i].name
                                });
                                $("#Info").append(regionalBlocs);
                            }

                            //Set Image to Country Flag
                            document.getElementById('Flag').src = data.flag;
                            document.getElementById('Flag').alt = data.name + " Flag";


                            // Get the <span> element that closes the modal
                            var span = document.getElementsByClassName("close")[0];

                            // When the user clicks the button, open the modal 
                            modal.style.display = "block";
                            $('body').css('overflow', 'hidden');

                            // When the user clicks on <span> (x), close the modal
                            span.onclick = function () {
                                $('body').css('overflow', 'auto');
                                modal.style.display = "none";
                            }

                            // When the user clicks anywhere outside of the modal, close it
                            window.onclick = function (event) {
                                if (event.target == modal) {
                                    $('body').css('overflow', 'auto');
                                    modal.style.display = "none";
                                }
                            }

                        }
                    });
                } catch (err) {}
            });
            //Draw Chart using data and options
            chart.draw(data, options);
        }

    });