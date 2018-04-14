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
    $("#imagenn").val("");
    $("#tittlee").val("");
    $("#tittleEditt").val("");
    $("#imagenActuall").val("");
    $("#EditImagenn").val("");
    $('#img').val("");
}

function cancelarform() {
    limpiar();
}

function listar() {
    tabla = $('#myTableImagen').dataTable({
                "aProcessing": true,
                "aServerSide": true,
                "ajax":
                        {
                            url: 'NoticiaImagen/listar',
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
        url: "NoticiaImagen/insertar",
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,

        success: function (datos) {
            swal("Se realizo el registro!", datos, "success");           
            tabla.ajax.reload(); 
        }

    });    
    $('#add-imagen').modal('hide');
    limpiar();
}

function editar(e) {
    e.preventDefault();
    var formData = new FormData($('#formularioEditar')[0]);
    $.ajax({
        url: "NoticiaImagen/modificar",
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,

        success: function (datos) {
            swal("Se modifico el registro!", datos, "success");           
            tabla.ajax.reload(); 
        }

    });
    $('#edit-imagen').modal('hide');
    limpiar();
}

function mostrar(idImagen) {
    $.post("NoticiaImagen/mostrar", {idImagen: idImagen}, function (data) {
        data = JSON.parse(data);
        console.log(data);
        $("#idImagenEdit").val(data.tb_imagen_id);
        $("#tittleEditt").val(data.tb_imagen_tittle);
        $("#imagenmuestraa").attr("src","files/imgPage/"+data.tb_imagen_name);
        $("#ubicacionEdit").val(data.tb_imagen_ubica);

    });
}

function eliminar(idImagen) {
    swal({
        title: "¿Estas seguro?",
        text: "Usted no sera capas de recuperar este registro!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        $.post("NoticiaImagen/eliminar", {idImagen: idImagen}, function (e) {
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