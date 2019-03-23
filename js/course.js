$(document).ready(function () {
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
                if (CourseID[i] != "A4") {
                $('#CourseDropdown').append('<option value="' + CourseID[i] + '">' + CourseName[i] + '</option>');
                }
            }
        }
    });

    $("#CourseDropdown").change(function () {
        $("#myChart").remove(); // removing previous canvas element
        $("#chart-container").append('<canvas id="myChart" class="myChart"></canvas>');
        var course = document.getElementById('CourseDropdown').value;
        $.ajax({
            type: "GET",
            url: "http://api.lmiforall.org.uk/api/v1/hesa/occupations?courses=" + course,
            dataType: "json",
            success: function (data) {
                console.log(data)

                var OccupationSOC = [];
                var OccupationTitle = [];
                var OccupationPercentage = [];


                var arrayLength = data.length;
                //console.log(arrayLength);

                for (var i = 0; i < arrayLength; i++) {
                    //OccupationSOC[i] = data[arrayLength - 1][i].soc;
                    OccupationTitle[i] = data[3].occupations[i].title;
                    OccupationPercentage[i] = data[3].occupations[i].percentage;
                }

                //var total = 0;
                //for (var i = 0; i < OccupationPercentage.length; i++) {
                //	total += OccupationPercentage[i] << 0;
                //}
                
                //OccupationTitle[arrayLength] = "Other";
                //OccupationPercentage[arrayLength] = 100-total;

                console.log(OccupationTitle)

                var ctx = document.getElementById('myChart');
                var myChart = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: OccupationTitle,
                        datasets: [{
                            label: '#percentage of workers',
                            data: OccupationPercentage,
                            backgroundColor: ["#FF0000", "#0000FF", "#FFFF00", "#00FF00", "#FF00FF", "#FFA500"],
                        }]
                    },
                    options: {
                        responsive: true,
                    }
                });


            }
        });
    });

    $("#Submit").click(function () {
        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Lime', 'Magenta', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: ["#FF0000", "#0000FF", "#FFFF00", "#00FF00", "#FF00FF", "#FFA500"],
                }]
            },
            options: {
                responsive: true,
            }
        });
    });
});