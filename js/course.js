$(document).ready(function () {
    var myChart;
    var OccupationSOC = [];
    var OccupationTitle = [];
    var OccupationPercentage = [];
    $("#myChart").remove(); // removing previous canvas element
    $("#chart-container").append('<canvas id="myChart" class="myChart"></canvas>');
    $.ajax({
        type: "GET",
        url: "http://api.lmiforall.org.uk/api/v1/hesa/list-courses",
        dataType: "json",
        success: function (data) {
            console.log(data)

            var CourseID = [];
            var CourseName = [];

            var arrayLength = data.length;
            //console.log(arrayLength);

            for (var i = 0; i < arrayLength; i++) {
                CourseID[i] = data[i].id;
                CourseName[i] = data[i].name;
            }

            console.log(CourseID);
            console.log(CourseName);

            for (var i = 0; i < arrayLength; i++) {
                if (data[i].id != "A0") {
                    $('#CourseDropdown').append('<option value="' + CourseID[i] + '">' + CourseName[i] + '</option>');
                }
            }
        }
    });

    $("#CourseDropdown").change(function () {
        $("#chart-container").html("");
        $("#myChart").remove(); // removing previous canvas element
        $("#chart-container").append('<canvas id="myChart" class="myChart" width="500" height="500"></canvas>');
        var course = document.getElementById('CourseDropdown').value;
        $.ajax({
            type: "GET",
            url: "http://api.lmiforall.org.uk/api/v1/hesa/occupations?courses=" + course,
            dataType: "json",
            success: function (data) {
                console.log(data)

                var arrayLength = data.length;
                //console.log(arrayLength);
                if (arrayLength == 0) {
                    alert("No Data avialable");
                    $("#chart-container").html("No Data avialable");
                } else {
                    var lastArray = arrayLength - 1;
                    var CourseArrayLength = data[lastArray].occupations.length;
                    console.log(CourseArrayLength);
                    if (CourseArrayLength <= 10) {
                        for (var i = 0; i < CourseArrayLength; i++) {
                            //OccupationSOC[i] = data[arrayLength - 1][i].soc;
                            OccupationTitle[i] = data[lastArray].occupations[i].title;
                            OccupationPercentage[i] = data[lastArray].occupations[i].percentage;
                        }
                    } else {
                        for (var i = 0; i < 10; i++) {
                            //OccupationSOC[i] = data[arrayLength - 1][i].soc;
                            OccupationTitle[i] = data[lastArray].occupations[i].title;
                            OccupationPercentage[i] = data[lastArray].occupations[i].percentage;
                        }
                    }

                    //var total = 0;
                    //for (var i = 0; i < OccupationPercentage.length; i++) {
                    //	total += OccupationPercentage[i] << 0;
                    //}

                    //OccupationTitle[arrayLength] = "Other";
                    //OccupationPercentage[arrayLength] = 100-total;

                    console.log(OccupationTitle)
                }

            },
            error: function (xhr, status) {
                $("#chart-container").html("No Data avialable");
            },
            complete: function (data) {
                var ctx = document.getElementById('myChart');
                myChart = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: OccupationTitle,
                        datasets: [{
                            label: '#percentage of workers',
                            data: OccupationPercentage,
                            backgroundColor: ["#69D2E7", "#A7DBD8", "#E0E4CC", "#F38630", "#FA6900"],
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        legend: {
                            position: "right"
                        }
                    }
                });
                var windowWidth = $(window).width();
                if (windowWidth < 1000) {
                    myChart.options.legend.position = 'top';
                    myChart.update();
                }
                if (windowWidth >= 1000) {
                    myChart.options.legend.position = 'right';
                    myChart.update();
                }
            }
        });
    });

    $(window).on('resize', function (event) {
        var windowWidth = $(window).width();
        if (windowWidth < 1000) {
            myChart.options.legend.position = 'top';
            myChart.update();
        }
        if (windowWidth >= 1000) {
            myChart.options.legend.position = 'right';
            myChart.update();
        }
    });
});