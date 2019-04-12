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

                            // Get the button that opens the modal

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