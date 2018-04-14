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
    $("#imagen").val("");
    $("#tittle").val("");
    $("#tittleEdit").val("");
    $("#imagenActual").val("");
    $("#EditImagen").val("");
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
                            url: 'PrevencionImagen/listar',
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
        url: "Imagen/insertar",
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
        url: "Imagen/modificar",
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
    $.post("Imagen/mostrar", {idImagen: idImagen}, function (data) {
        data = JSON.parse(data);
        console.log(data);
        $("#idImagenEdit").val(data.tb_imagen_id);
        $("#tittleEdit").val(data.tb_imagen_tittle);
        $("#imagenmuestra").attr("src","files/imgPage/"+data.tb_imagen_name);
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
        $.post("Imagen/eliminar", {idImagen: idImagen}, function (e) {
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