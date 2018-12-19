$(document).ready(function() {
    $('#logout_btn').click(function(){
        window.location.href = '/logout';
    });

    $('#btn_suditos').click(function(){
        $.ajax({
            url: '/suditos',
            method: "get",
            success:function(data) {
                if (data === 'logout') {
                    $('#logout_btn').click();
                }
                $('#acoes').html(data);
            }
        });
    });

    $('#btn_pergaminhos').click(function(){
        $.ajax({
            url: '/pergaminhos',
            method: "get",
            success:function(data) {
                if (data === 'logout') {
                    $('#logout_btn').click();
                }
                $('#acoes').html(data); 
                clearTimeout(timerInstance);
                cronometro();
            }
        });
    });
});

var timerInstance = null; //evita que várias instancias desse metodo sejam ativas
function cronometro() {
    $('.timer').each(function(){
        var seconds = $(this).html();
        var updatedTime = parseInt(seconds) - 1;
        if (updatedTime < 0) {
            $('#btn_pergaminhos').click();
        } else {
            $(this).html(updatedTime)
        }
    });
    timerInstance = setTimeout('cronometro()', 1000);
}