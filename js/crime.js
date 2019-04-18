		//DatePicker Options
		var options = {
			container: ".DatePicker",
			autoclose: true,
			minViewMode: 1,
			format: 'yyyy-mm',
			startDate: '2016-04',
			endDate: "0d",
			clearBtn: true,
			pickerPosition: "bottom-left"
		};
		//Create Datepicker
		$('.date-own').datepicker(options);
		
		$(document).ready(function () {
			//Set LocationText's Value to be empty
			document.getElementById('LocationText').value = "";
			
			//Display Chart Button Press Function
			$("#ChartDisplay").click(function () {
				//Chart Variables
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

				//Clear Previous Charts
				$("#chart-container").html("");
				$("#myChart").remove(); // removing previous canvas element
				$("#chart-container").append('<canvas id="myChart" class="myChart" width="500" height="500"></canvas>');

				//Obtain Location and Create API Variables
				var location = document.getElementById('LocationText').value;
				var longitude;
				var latitude; 
				var date = $('#date').val();
				var arrayLength = 0;

				//API Call - Obtain Latitude and Longitude from Name
				$.ajax({
					type: "GET",
					url: "https://api.apixu.com/v1/current.json?key=75fb86a2371f4abca12115412190403&q=" +
						location,
					dataType: "json",
					error: function () {
						//If it dosent work show error message
						$("#errorlocation").show();

						$("#errorlocation").html("Issue obtaining API data. Please enter a proper location.");
					},
					success: function (data) {
						//Hide error message if showing
						$("#errorlocation").html("");
						$("#errorlocation").hide();

						//Set Lat and Long variables to Location's Lat and long
						latitude = data.location.lat;
						longitude = data.location.lon;
						
						//If Locatiion not in UK display error message 
						if (!(data.location.country == "United Kingdom")) {
							$("#errorlocation").show();
							$("#errorlocation").html("Location is not in United Kingdom.");
						} else { //Display Set URL for API Call
							if (date == "") {
								var url = "https://data.police.uk/api/crimes-street/all-crime?lat=" + latitude + "&lng=" + longitude;
							} else {
								var url = "https://data.police.uk/api/crimes-street/all-crime?lat=" + latitude + "&lng=" + longitude + "&date=" + date;
							}
							//API Call - Obatin Crime Numbers
							$.ajax({
								type: "GET",
								url: url,
								dataType: "json",
								success: function (data) {

									arrayLength = data.length;

									//Counting all Crimes
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
								},
								//If any errors show No Data avialable message
								error: function (jqXHR, status, errorThrown) {
									$("#chart-container").html("<br><h1>No Crime Data Avialable</h1>" +
									"<p>Due to how the Data is being recieved we are not responsible for any Crime Data that is not shown.</p>");
								},
								complete: function (data) {
									//If there was Data then Create and Display Chart
									if (!(arrayLength == 0)) {
										var ctx = document.getElementById('myChart').getContext("2d");
										myChart = new Chart(ctx, {
											type: 'bar',
											data: {
												labels: ["Crime"],
												//Chart Data
												datasets: [{
														label: "Anti-social behaviour",
														data: [antiSocialBehaviourCount],
														backgroundColor: "#33ccff",
														hoverBackgroundColor: "#33ccff",

													},
													{
														label: "Bicycle theft",
														data: [bicycleTheftCount],
														backgroundColor: "#0099cc",
														hoverBackgroundColor: "#0099cc",

													},
													{
														label: "Burglary",
														data: [burglaryCount],
														backgroundColor: "#006080",
														hoverBackgroundColor: "#006080",


													},
													{
														label: "Criminal damage and arson",
														data: [criminalDamageArsonCount],
														backgroundColor: "#00394d",
														hoverBackgroundColor: "#00394d",


													},
													{
														label: "Drugs",
														data: [drugsCount],
														backgroundColor: "#191970",
														hoverBackgroundColor: "#191970",


													},
													{
														label: "Other theft",
														data: [otherTheftCount],
														backgroundColor: "#3c0e55",
														hoverBackgroundColor: "#3c0e55",


													},
													{
														label: "Possession of weapons",
														data: [possessionOfWeaponsCount],
														backgroundColor: "#4d0026",
														hoverBackgroundColor: "#4d0026",


													},
													{
														label: "Public order",
														data: [publicOrderCount],
														backgroundColor: "#800040",
														hoverBackgroundColor: "#800040",


													},
													{
														label: "Robbery",
														data: [robberyCount],
														backgroundColor: "#b30059",
														hoverBackgroundColor: "#b30059",


													},
													{
														label: "Shoplifting",
														data: [shopliftingCount],
														backgroundColor: "#e60073",
														hoverBackgroundColor: "#e60073",


													},
													{
														label: "Theft from the person",
														data: [theftFromThePersonCount],
														backgroundColor: "#ff1a8c",
														hoverBackgroundColor: "#ff1a8c",


													},
													{
														label: "Vehicle crime",
														data: [vehicleCrimeCount],
														backgroundColor: "#ff53a9",
														hoverBackgroundColor: "#ff53a9",


													},
													{
														label: "Violence and sexual offences",
														data: [violentCrimeCount],
														backgroundColor: "#ff79bc",
														hoverBackgroundColor: "#ff79bc",

													},
													{
														label: "Other crime",
														data: [otherCrimeCount],
														backgroundColor: "#ffa8d4",
														hoverBackgroundColor: "#ffa8d4"

													}]
											},
											//Chart Options
											options: {
												responsive: true,
												maintainAspectRatio: false,
												legend: { position: 'right'},
											}
										});
										//Change Click event trigger depending on Page size
										var windowWidth = $(window).width();
										if (windowWidth > 500) {
											document.getElementById("myChart").onclick = function(evt){
												var activePoints = myChart.getElementsAtEvent(evt);
												var firstPoint = activePoints[0];
												var label = myChart.data.labels[firstPoint._index];
												window.open("https://www.met.police.uk/sd/stats-and-data/met/crime-type-definitions/", '_blank');
							
											};
										}
										if (windowWidth < 500) {
											document.getElementById("myChart").ondblclick = function (evt) {
												var activePoints = myChart.getElementsAtEvent(evt);
												var firstPoint = activePoints[0];
												var label = myChart.data.labels[firstPoint._index];
												window.open("https://www.met.police.uk/sd/stats-and-data/met/crime-type-definitions/", '_blank');
							
											};
										}
										//Change Legend Location based on page size
										if (windowWidth < 1000) {
											myChart.options.legend.position = 'bottom';
											myChart.update();
										}
										if (windowWidth >= 1000) {
											myChart.options.legend.position = 'right';
											myChart.update();
										}
									} else {
										//Display error mesaage if data was empty
										$("#chart-container").html("<br><h1>No Crime Data Avialable</h1>" +
											"<p>Due to how the Data is being recieved we are not responsible for any Crime Data that is not shown.</p>");
									}
								}
							});
						}
					}
				});

				//Check and if needed Change Click Trigger and Legend Location depending on Page size when resizing page 
				$(window).on('resize', function (event) {
					try {
						var windowWidth = $(window).width();
						if (windowWidth > 500) {
							document.getElementById("myChart").ondblclick = null;
							document.getElementById("myChart").onclick = function(evt){
								var activePoints = myChart.getElementsAtEvent(evt);
								var firstPoint = activePoints[0];
								var label = myChart.data.labels[firstPoint._index];
								window.open("https://www.met.police.uk/sd/stats-and-data/met/crime-type-definitions/", '_blank');
			
							};
						}
						if (windowWidth < 500) {
							document.getElementById("myChart").onclick = null;
							document.getElementById("myChart").ondblclick = function (evt) {
								var activePoints = myChart.getElementsAtEvent(evt);
								var firstPoint = activePoints[0];
								var label = myChart.data.labels[firstPoint._index];
								window.open("https://www.met.police.uk/sd/stats-and-data/met/crime-type-definitions/", '_blank');
			
							};
						}
						if (windowWidth < 1000) {
							myChart.options.legend.position = 'bottom';
							myChart.update();
						}
						if (windowWidth >= 1000) {
							myChart.options.legend.position = 'right';
							myChart.update();
						}
					} catch (err) {
					}
				});
			});

		});