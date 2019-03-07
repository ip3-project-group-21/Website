$.ajax({
    url: 'navbar.html',
    dataType: 'html',
    success: function (data) {
        $('#navbar').html(data);
    }
});
