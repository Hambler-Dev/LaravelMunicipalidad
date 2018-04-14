var tabla;

function init() {
    listar();
    $('#formularioGuardar').on("submit", function (e) {
        guardar(e);
    });
    $('#formularioEditar').on("submit", function (e) {
        editar(e);
    });
   
}

function  limpiar() {
    $("#name").val("");
    $('#nameEdit').val("");
}

function cancelarform() {
    limpiar();
}

function listar() {
    tabla = $('#myTableMenu').dataTable({
                "aProcessing": true,
                "aServerSide": true,
                "ajax":
                        {
                            url: 'AccesiMenu/listar',
                            type: "get",
                            dataType: "json",
                            error: function (e) {
                                console.log(e.responseText);
                            }
                        },
                "bDestroy": true,
                "iDisplayLength": 5,
                "order": [[0, "asc"]]
            }).DataTable();
}

function guardar(e) {
    e.preventDefault();
    var formData = new FormData($('#formularioGuardar')[0]);
    $.ajax({
        url: "Menu/insertar",
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,

        success: function (datos) {
            swal("Se realizo el registro!", datos, "success");           
            tabla.ajax.reload(); 
        }

    });    
    $('#add-menu').modal('hide');
    limpiar();
}

function editar(e) {
    e.preventDefault();
    var formData = new FormData($('#formularioEditar')[0]);
    $.ajax({
        url: "Menu/modificar",
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,

        success: function (datos) {
            swal("Se modifico el registro!", datos, "success");           
            tabla.ajax.reload(); 
        }

    });
    $('#edit-menu').modal('hide');
    limpiar();
}

function mostrar(idMenu) {
    $.post("Menu/mostrar", {idMenu: idMenu}, function (data) {
        data = JSON.parse(data);
        $("#idMenuEdit").val(data.tb_menu_id);
        $("#nameEdit").val(data.tb_menu_name);
        $("#ubicacionEdit").val(data.tb_menu_ubica);

    });
}

function eliminar(idMenu) {
    swal({
        title: "¿Estas seguro?",
        text: "Usted no sera capas de recuperar este registro!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        $.post("Menu/eliminar", {idMenu: idMenu}, function (e) {
            swal("Registro eliminado!", e , "success");
            icon: "success",
            tabla.ajax.reload();
        });
        } else {
            swal("Cancelado", "no se elimino :)", "error");
        }
    });   
}

init();