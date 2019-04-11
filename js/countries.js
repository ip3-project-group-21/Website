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

                    CountryName[i] = data[i].alpha2Code;
                    CountryPopulation[i] = data[i].population;


                    /* 	var Information = $("<div />");
                        Information.append(CountryName).append(CountryPopulation);
                        $("#chart").append(Information); */
                }
            }
        });

        function drawRegionsMap() {
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Country:');
            data.addColumn('number', 'Population');

            for (i = 0; i < CountryName.length; i++) {
                data.addRow([CountryName[i], CountryPopulation[i]]);
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
                    trigger: 'focus'
                },
                tooltip: {
                    isHtml: true
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

            chart.draw(data, options);
            /* 				$(window).resize(function () {
                            var view = new google.visualization.DataView(data);
                            chart.draw(view, options);
                        }); */
        }

    });