$(document).ready(function() {
    $('#logout_btn').click(function(){
        window.location.href = '/logout';
    });

    $('#btn_suditos').click(function(){
        $.ajax({
            url: '/suditos',
            method: "get",
            success:function(data) {
                $('#acoes').html(data);
            }
        });
    });

    $('#btn_pergaminhos').click(function(){
        $.ajax({
            url: '/pergaminhos',
            method: "get",
            success:function(data) {
                $('#acoes').html(data); 
            }
        });
    });
});