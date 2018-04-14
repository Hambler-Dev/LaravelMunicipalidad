var tablaContenido;

function init() {
    listarContenido();
    $('#formularioGuardarContenido').on("submit", function (e) {
        guardarContenido(e);
    });
    $('#formularioEditarContenido').on("submit", function (e) {
        editarContenido(e);
    });
    selecMenu();
    selecEditMenu();

}

function limpiarContenido() {
    $('#tittle').val("");
    $('#description').val("");
   // $('#cuerpo').empty().val("");
    //limpiarContenido idSubMenu
   // $("#idSubMenu").empty().append('');
   //reiniciari editor
   CKEDITOR.instances.cuerpo.setData('');   
   CKEDITOR.instances.cuerpoEdit.setData(''); 
   selecMenu();
   selecEditMenu();
    
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
            url: 'CiudadContenidoMenu/listar',
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
        url: "ContenidoMenu/insertar",
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
        url: "ContenidoMenu/modificar",
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

function mostrarContenido(idContenido) {
    $.post("ContenidoMenu/mostrar", {idContenido: idContenido}, function (data) {
        data = JSON.parse(data);
        $("#idContenidoEdit").val(data.tb_contenido_id);
        $("#idMenuContenidoEdit").val(data.tb_menu_id);
        $("#tittleEdit").val(data.tb_contenido_tittle);
        $("#descriptionEdit").val(data.tb_contenido_desc);
        CKEDITOR.instances.cuerpoEdit.setData(data.tb_contenido_cuerpo);
    });
}

function eliminarContenido(idContenido) {
    swal({
            title: "¿Estas seguro?",
            text: "Usted no sera capas de recuperar este registro!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                $.post("ContenidoMenu/eliminar", {
                    idContenido: idContenido
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

function selecMenu() {
    $.post('CiudadContenidoMenu/secMenu', function (r) {
        $('#idMenuContenido').html(r);
    });

}

function selecEditMenu() {
    $.post('CiudadContenidoMenu/secMenu', function (r) {
        $('#idMenuContenidoEdit').html(r);
    });
   
}


init();