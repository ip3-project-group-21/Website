		//var container = $('.bootstrap-iso form').length > 0 ? $('.bootstrap-iso form').parent() : "body";
		var options = {
		    container: ".form-group",
		    autoclose: true,
		    minViewMode: 1,
		    format: 'yyyy-mm',
		    startDate: '2016-04',
		    endDate: "0d",
		    orientation: "auto",
		    clearBtn: true
		    //pickerPosition: "bottom-left"
		};
		$('.date-own').datepicker(options);
		$(document).ready(function () {
		    document.getElementById('LocationText').value = "";
		    $("#ChartDisplay").click(function () {
		        var myChart;
		        var antiSocialBehaviourCount = 0;
		        var bicycleTheftCount = 0;
		        var burglaryCount = 0;
		        var criminalDamageArsonCount = 0;
		        var drugsCount = 0;
		        var otherTheftCount = 0;
		        var possessionOfWeaponsCount = 0;
		        var publicOrderCount = 0;
		        var robberyCount = 0;
		        var shopliftingCount = 0;
		        var theftFromThePersonCount = 0;
		        var vehicleCrimeCount = 0;
		        var violentCrimeCount = 0;
		        var otherCrimeCount = 0;
		        $("#chart-container").html("");
		        $("#myChart").remove(); // removing previous canvas element
		        $("#chart-container").append('<canvas id="myChart" class="myChart"></canvas>');
		        //width="500" height="500"
		        var location = document.getElementById('LocationText').value;
		        var longitude; //= document.getElementById('Longitude').value;
		        var latitude; //= document.getElementById('Latitude').value;
		        var date = $('#date').val(); //+ "-01";
		        var arrayLength = 0;

		        $.ajax({
		            type: "GET",
		            url: "http://api.apixu.com/v1/current.json?key=75fb86a2371f4abca12115412190403&q=" +
		                location,
		            dataType: "json",
		            error: function () {
                        $("#errorlocation").show();

		                $("#errorlocation").html("Issue obtaining API data. Please enter a proper location.");
		            },
		            success: function (data) {
                        $("#errorlocation").html("");
                        $("#errorlocation").hide();

		                latitude = data.location.lat;
		                longitude = data.location.lon;
		                if (!(data.location.country == "United Kingdom")) {
                            $("#errorlocation").show();
                            $("#errorlocation").html("Location is not in United Kingdom.");
		                } else {
		                    $.ajax({
		                        type: "GET",
		                        url: "https://data.police.uk/api/crimes-street/all-crime?lat=" +
		                            latitude +
		                            "&lng=" +
		                            longitude + "&date=" + date,
		                        dataType: "json",
		                        success: function (data) {
		                            console.log(data)

		                            arrayLength = data.length;
		                            console.log(arrayLength);

		                            //console.log(arrayLength);

		                            for (var i = 0; i < arrayLength; i++) {
		                                if (data[i].category ==
		                                    "anti-social-behaviour") {
		                                    antiSocialBehaviourCount++;
		                                }
		                                if (data[i].category == "bicycle-theft") {
		                                    bicycleTheftCount++;

		                                }
		                                if (data[i].category == "burglary") {
		                                    burglaryCount++;

		                                }
		                                if (data[i].category ==
		                                    "criminal-damage-arson") {
		                                    criminalDamageArsonCount++;

		                                }
		                                if (data[i].category == "drugs") {
		                                    drugsCount++;

		                                }
		                                if (data[i].category == "other-theft") {
		                                    otherTheftCount++;

		                                }
		                                if (data[i].category ==
		                                    "possession-of-weapons") {
		                                    possessionOfWeaponsCount++;

		                                }
		                                if (data[i].category == "public-order") {
		                                    publicOrderCount++;

		                                }
		                                if (data[i].category == "robbery") {
		                                    robberyCount++;

		                                }
		                                if (data[i].category == "shoplifting") {
		                                    shopliftingCount++;

		                                }
		                                if (data[i].category ==
		                                    "theft-from-the-person") {
		                                    theftFromThePersonCount++;

		                                }
		                                if (data[i].category == "vehicle-crime") {
		                                    vehicleCrimeCount++;

		                                }
		                                if (data[i].category == "violent-crime") {
		                                    violentCrimeCount++;

		                                }
		                                if (data[i].category == "other-crime") {
		                                    otherCrimeCount++;

		                                }
		                            }
		                            //console.log(otherCrimeCount);





		                        },
		                        /* 							error: function (jqXHR, status, errorThrown) {
		                        								alert("Location not in United Kingdom");
		                        							}, */
		                        complete: function (data) {
		                            if (!(arrayLength == 0)) {
		                                var ctx = document.getElementById('myChart');
		                                myChart = new Chart(ctx, {
		                                    type: 'horizontalBar',
		                                    data: {
		                                        labels: ["Anti-social behaviour",
		                                            "Bicycle theft",
		                                            "Burglary",
		                                            "Criminal damage and arson",
		                                            "Drugs",
		                                            "Other theft",
		                                            "Possession of weapons",
		                                            "Public order", "Robbery",
		                                            "Shoplifting",
		                                            "Theft from the person",
		                                            "Vehicle crime",
		                                            "Violence and sexual offences",
		                                            "Other crime"
		                                        ],
		                                        datasets: [{
		                                            label: 'Amount:',
		                                            data: [antiSocialBehaviourCount,
		                                                bicycleTheftCount,
		                                                burglaryCount,
		                                                criminalDamageArsonCount,
		                                                drugsCount,
		                                                otherTheftCount,
		                                                possessionOfWeaponsCount,
		                                                publicOrderCount,
		                                                robberyCount,
		                                                shopliftingCount,
		                                                theftFromThePersonCount,
		                                                vehicleCrimeCount,
		                                                violentCrimeCount,
		                                                otherCrimeCount
		                                            ],
		                                            backgroundColor: [
		                                                "#33ccff",
		                                                "#0099cc",
		                                                "#006080",
														"#00394d",
														"#191970",
														"#3c0e55",
														"#4d0026",
		                                                "#800040",
		                                                "#b30059",
		                                                "#e60073",
														"#ff1a8c",
														"#ff53a9",
														"#ff79bc",
		                                                "#ffa8d4"
		                                            ],
		                                            //backgroundColor: ["#69D2E7", "#A7DBD8", "#94b2a2", "#a3a88b", "#b29e74" , , ,"#F38630", "#FA6900"],

		                                        }]
		                                    },
		                                    options: {
		                                        responsive: true,
		                                        maintainAspectRatio: true,
		                                        legend: {
		                                            display: false,
		                                        }
		                                    }
		                                });
		                            } else {
		                                $("#chart-container").html("<br><h1>No Crime Data Avialable</h1>" +
		                                    "<p>Due to how the Data is being recieved we are not responsible for any Crime Data that is not shown.</p>");
		                            }
		                        }
		                    });
		                }
					}
						        });
		    });

		});