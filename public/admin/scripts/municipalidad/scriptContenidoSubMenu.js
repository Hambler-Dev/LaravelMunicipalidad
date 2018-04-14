var tablaContenido;

function init() {
    listarContenido();
    $('#formularioGuardarContenido').on("submit", function (e) {
        guardarContenido(e);
    });
    $('#formularioEditarContenido').on("submit", function (e) {
        editarContenido(e);
    });
    selecMenuContenido();
    selecSubMenuContenido(idMenuContenido);
    selecEditMenuContenido();
    selecEditSubMenuContenido(idMenuContenidoEdit);

}

function limpiarContenido() {
    $('#tittle').val("");
    $('#description').val("");
    // $('#cuerpo').empty().val("");
    //limpiarContenido idSubMenu
    //  $("#idSubMenuContenido").empty().append('');
    //reiniciari editor
    CKEDITOR.instances.cuerpo.setData('');
    CKEDITOR.instances.cuerpoEdit.setData('');
    selecMenuContenido();
    selecSubMenuContenido(idMenuContenido);
    selecEditMenuContenido();
    selecEditSubMenuContenido(idMenuContenidoEdit);

}

function cancelarContenido() {
    limpiarContenido();
}

function activarCuerpo() {
    document.getElementById('cuerpo').value = CKEDITOR.instances.cuerpo.getData();
}

function activarCuerpoEdit() {
    document.getElementById('cuerpoEdit').value = CKEDITOR.instances.cuerpoEdit.getData();
}

function listarContenido() {
    tablaContenido = $('#myTableContenido').dataTable({
        "aProcessing": true,
        "aServerSide": true,
        "ajax": {
            url: 'ContenidoSubMenu/listar',
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
        url: "ContenidoSubMenu/insertar",
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (datos) {
            swal("Se realizo el registro!", datos, "success");
            tablaContenido.ajax.reload();
        }
    });
    $('#add-SubMenuContenido').modal('hide');
    cancelarContenido();
}

function editarContenido(e) {
    e.preventDefault();
    var formData = new FormData($('#formularioEditarContenido')[0]);
    $.ajax({
        url: "ContenidoSubMenu/modificar",
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,

        success: function (datos) {
            swal("Se modifico el registro!", datos, "success");
            tablaContenido.ajax.reload();
        }

    });
    $('#edit-SubMenucontenidoEditar').modal('hide');
    cancelarContenido();
}

function mostrarContenido(idContenido) {
    $.post("ContenidoSubMenu/mostrar", {idContenido: idContenido}, function (data){
        data = JSON.parse(data);
        console.log(data);
        $("#idContenidoEdit").val(data.tb_subcontenido_id);
        $("#idMenuContenidoEdit").val(data.tb_menu_id);
        $("#idSubMenuContenidoEdit").val(data.tb_submenu_id);
        $("#tittleEdit").val(data.tb_subcontenido_tittle);
        $("#descriptionEdit").val(data.tb_subcontenido_desc);
        CKEDITOR.instances.cuerpoEdit.setData(data.tb_subcontenido_cuerpo);
    });
    selecEditSubMenuContenido(idMenuContenidoEdit);
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
                $.post("ContenidoSubMenu/eliminar", {
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


function selecMenuContenido() {
    $.post('ContenidoSubMenu/secMenu', function (r) {
        $('#idMenuContenido').html(r);
    });

}

function selecEditMenuContenido() {
    $.post('ContenidoSubMenu/secMenu', function (r) {
        $('#idMenuContenidoEdit').html(r);
    });

}

function selecSubMenuContenido(idMenuContenido) {
    $("#idMenuContenido").change(function () {
        $("#idMenuContenido option:selected").each(function () {
            idMenuContenido = $(this).val();
            $.post('ContenidoSubMenu/sectSubMenu', {
                idMenuContenido: idMenuContenido
            }, function (data) {
                $("#idSubMenuContenido").html(data);
            });
        });
    });

}

function selecEditSubMenuContenido(idMenuContenidoEdit) {
    $("#idMenuContenidoEdit").change(function () {
        $("#idMenuContenidoEdit option:selected").each(function () {
            idMenuContenidoEdit = $(this).val();
            console.log(idMenuContenidoEdit);
            $.post('ContenidoSubMenu/sectSubMenuEdit', {
                idMenuContenidoEdit: idMenuContenidoEdit
                
            }, function (data) {
                
                $("#idSubMenuContenidoEdit").html(data);
            });
        });
    });


}

init();