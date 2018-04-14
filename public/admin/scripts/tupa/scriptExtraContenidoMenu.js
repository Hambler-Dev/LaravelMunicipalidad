var tablaContenido;

function init() {
    listarContenido();
    $('#formularioGuardarContenido').on("submit", function (e) {
        guardarContenido(e);
    });
    $('#formularioEditarContenido').on("submit", function (e) {
        editarContenido(e);
    });
    selecMenuContenidoPrincipal();
    selecSubMenuContenido(idMenuConPrincipal);
    selecSubMenuContenidoExtra(idMenuContenido);
    selecMenuContenidoPrincipalEdit();
    selecEditSubMenuContenido(idMenuConPrincipalEdit);
    selecEditSubMenuContenidoExtra(idMenuContenidoEdit);

}

function limpiarContenido() {
    $('#tittle').val("");
    $('#description').val("");
    selecMenuContenidoPrincipal();
    CKEDITOR.instances.cuerpo.setData('');
    CKEDITOR.instances.cuerpoEdit.setData('');
    selecSubMenuContenido(idMenuConPrincipal);
    selecSubMenuContenidoExtra(idMenuContenido);
    selecMenuContenidoPrincipalEdit();
    selecEditSubMenuContenido(idMenuConPrincipalEdit);
    selecEditSubMenuContenidoExtra(idMenuContenidoEdit);

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
            url: 'TupaExtraContenidoMenu/listar',
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
        url: "ServicioExtraContenidoMenu/insertar",
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
        url: "ServicioExtraContenidoMenu/modificar",
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
    $.post("ServicioExtraContenidoMenu/mostrar", {idContenido: idContenido}, function (data){
        data = JSON.parse(data);
        console.log(data);
        $("#idContenidoEdit").val(data.tb_iiicontenido_id);
        $("#idMenuConPrincipalEdit").val(data.tb_menu_id);
        $("#idMenuContenidoEdit").val(data.tb_submenu_id);
        $("#idSubMenuContenidoEdit").val(data.tb_iiimenu_id);
        $("#tittleEdit").val(data.tb_iiicontenido_tittle);
        $("#descriptionEdit").val(data.tb_iiicontenido_desc);
        CKEDITOR.instances.cuerpoEdit.setData(data.tb_iiicontenido_cuerpo);
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
                $.post("ServicioExtraContenidoMenu/eliminar", {
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

function selecMenuContenidoPrincipal() {
    $.post('TupaExtraMenu/secMenu', function (r) {
        $('#idMenuConPrincipal').html(r);
    });

}
function selecMenuContenidoPrincipalEdit() {
    $.post('TupaExtraMenu/secMenu', function (r) {
        $('#idMenuConPrincipalEdit').html(r);
    });

}


function selecSubMenuContenido(idMenuConPrincipal) {
    $("#idMenuConPrincipal").change(function () {
        //reinicar 3 nivel
        $('#idSubMenuContenido').find('option').remove().end().append(
            '<option value="reinicio"></option>').val('reinicio');
        
        $("#idMenuConPrincipal option:selected").each(function () {
            idMenuConPrincipal = $(this).val();
            console.log(idMenuConPrincipal);
            $.post('ServicioExtraContenidoMenu/sectSubMenu', {
                idMenuConPrincipal: idMenuConPrincipal
            }, function (data) {
                $("#idMenuContenido").html(data);
            });
        });
    });

}

function selecEditSubMenuContenido(idMenuConPrincipalEdit) {
    $("#idMenuConPrincipalEdit").change(function () {
        //reinicar 3 nivel
        $('#idSubMenuContenidoEdit').find('option').remove().end().append(
            '<option value="reinicio"></option>').val('reinicio');
        
        $("#idMenuConPrincipalEdit option:selected").each(function () {
            idMenuConPrincipalEdit = $(this).val();
            
            $.post('ServicioExtraContenidoMenu/sectSubMenuEdit', {
                idMenuConPrincipalEdit: idMenuConPrincipalEdit
            }, function (data) {
                console.log(data);
                $("#idMenuContenidoEdit").html(data);
            });
        });
    });
}

function selecSubMenuContenidoExtra(idMenuContenido) {
    $("#idMenuContenido").change(function () {
        $("#idMenuContenido option:selected").each(function () {
            idMenuContenido = $(this).val();
            $.post('ServicioExtraContenidoMenu/sectSubMenuExtra', {
                idMenuContenido: idMenuContenido
            }, function (data) {
                $("#idSubMenuContenido").html(data);
            });
        });
    });

}

function selecEditSubMenuContenidoExtra(idMenuContenidoEdit) {
    $("#idMenuContenidoEdit").change(function () {
        $("#idMenuContenidoEdit option:selected").each(function () {
            idMenuContenidoEdit = $(this).val();
            console.log(idMenuContenidoEdit);
            $.post('ServicioExtraContenidoMenu/sectSubMenuExtraEdit', {
                idMenuContenidoEdit: idMenuContenidoEdit
            }, function (data) {
                $("#idSubMenuContenidoEdit").html(data);
            });
        });
    });
}

init();