function init() {
    listar();
    

}

function lista() {
    $.post('Municipalidad/listar', function (data) {
        console.log(data);
        $('#incluirMenu').html(data);
    });
}

function listar() {   
    $.ajax({
        url: "Municipalidad/listar",
        type: "POST",
        dataType: "JSON",
        success: function (data) {

            var imprimir = '';
            imprimir += ' <ul id="accordion" class="tabs accordion ">';
            imprimir += '<li class="tab">';
            imprimir += '<a href="#info" class="link">hola';
            imprimir += '<i class="fa fa-chevron-down"></i>';
            imprimir += '</a>';
            imprimir += '<ul class="submenu">';
            imprimir += '<li><a href="#infoa">ja</a></li>';
            imprimir += '</ul>';
            imprimir += '</li>';
            $.each(data[0], function (key, value) {
                console.log(value.tb_menu_name);

                console.log(data[1]);


            });
            imprimir += ' </ul>';
            $('#imprime').append(imprimir) ;
        },
        error: function () {
            alert("Error Encontrado");
        }
    }).done(function(){
    });


}

/*function listarContenido() {
    $.post('Municipalidad/listartexto', function (data) {
        console.log(data);
        $('#cargarContenido').html(data);
    });
}*/

init();