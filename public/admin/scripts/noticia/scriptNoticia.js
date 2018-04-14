var tablaContenido;

function init() {
    listarContenido();
    $('#formularioGuardarContenido').on("submit", function (e) {
        guardarContenido(e);
    });
    $('#formularioEditarContenido').on("submit", function (e) {
        editarContenido(e);
    });

}

function limpiarContenido() {
    $('#tittle').val("");
    $('#description').val("");  
   CKEDITOR.instances.cuerpo.setData('');   
   CKEDITOR.instances.cuerpoEdit.setData(''); 
   $("#imagenActual").val("");
   $("#EditImagen").val("");
   $('#img').val("");
    
}

function cancelarContenido() {    
    limpiarContenido();
}

function activarCuerpo(){    
    document.getElementById('cuerpo').value=CKEDITOR.instances.cuerpo.getData();
}
function activarCuerpoEdit(){    
    document.getElementById('cuerpoEdit').value=CKEDITOR.instances.cuerpoEdit.getData();
}

function listarContenido() {
    tablaContenido = $('#myTableContenido').dataTable({
        "aProcessing": true,
        "aServerSide": true,
        "ajax": {
            url: 'Noticia/listar',
            type: "get",
            dataType: "json",
            error: function (e) {
                console.log(e.responseText);
            }
        },
        "bDestroy": true,
        "iDisplayLength": 5,
        "order": [
            [0, "asc"]
        ]
    }).DataTable();
}


function guardarContenido(e) {
    e.preventDefault();
    
    var formData = new FormData($('#formularioGuardarContenido')[0]);
    $.ajax({
        url: "Noticia/insertar",
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (datos) {
            swal("Se realizo el registro!", datos, "success");
            tablaContenido.ajax.reload();
        }
    });   
    $('#add-MenuContenido').modal('hide');
    cancelarContenido();
}

function editarContenido(e) {
    e.preventDefault();
    var formData = new FormData($('#formularioEditarContenido')[0]);
    $.ajax({
        url: "Noticia/modificar",
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,

        success: function (datos) {
            swal("Se modifico el registro!", datos, "success");
            tablaContenido.ajax.reload();
        }

    });   
    $('#edit-contenidoEditar').modal('hide');
    cancelarContenido();
}

function mostrarNoticia(idNoticia) {
    $.post("Noticia/mostrar", {idNoticia: idNoticia}, function (data) {
        data = JSON.parse(data);
        $("#idNoticiaEdit").val(data.tb_noticia_id);
        $("#tittleEdit").val(data.tb_noticia_title);
        $("#descriptionEdit").val(data.tb_noticia_desc);
        $("#imagenmuestra").attr("src","files/imgSlider/"+data.tb_noticia_image);
        CKEDITOR.instances.cuerpoEdit.setData(data.tb_noticia_cuerpo);
    });
}

function eliminarNoticia(idNoticia) {
    swal({
            title: "¿Estas seguro?",
            text: "Usted no sera capas de recuperar este registro!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                $.post("Noticia/eliminar", {
                    idNoticia: idNoticia
                }, function (e) {
                    swal("Registro eliminado!", e, "success");
                    icon: "success",
                        tablaContenido.ajax.reload();
                });
            } else {
                swal("Cancelado", "no se elimino :)", "error");
            }
        });
}



init();