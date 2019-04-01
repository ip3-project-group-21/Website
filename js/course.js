$(document).ready(function () {
    /*     $.each($('#CourseDropdown option'), function(key, optionElement) {
            var curText = $(optionElement).text();
            $(this).attr('title', curText);
        
            // Tip: parseInt('350px', 10) removes the 'px' by forcing parseInt to use a base ten numbering system.
            var lengthToShortenTo = Math.round(parseInt($(this).parent('select').css('max-width'), 10) / 7.3);
            
            if (curText.length > lengthToShortenTo) {
                $(this).text('... ' + curText.substring((curText.length - lengthToShortenTo), curText.length));
            }
        });
         */
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
        $("#CourseDropdown option[value='select']").remove();
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
                            backgroundColor: ["#33ccff", "#0099cc", "#006080", "#00394d", " #4d0026" ,"#800040", "#b30059" ," #e60073" ,"#ff1a8c", "#ff99cc"],
                            //backgroundColor: ["#69D2E7", "#A7DBD8", "#94b2a2", "#a3a88b", "#b29e74" , , ,"#F38630", "#FA6900"],

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
                document.getElementById("myChart").onclick = function(evt){
                    var activePoints = myChart.getElementsAtEvent(evt);
                    var firstPoint = activePoints[0];
                    var label = myChart.data.labels[firstPoint._index];
                    //var value = myChart.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
                    //alert(label + ": " + value);
                    window.open("https://www.indeed.co.uk/jobs?q=" + label + "&l=", '_blank');

                };
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
        try {
            var windowWidth = $(window).width();
            if (windowWidth < 1000) {
                myChart.options.legend.position = 'top';
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