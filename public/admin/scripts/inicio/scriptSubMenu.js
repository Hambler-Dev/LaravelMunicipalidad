var SubMenutabla;

function init() {
    SubMenuListar();
    $('#formularioSubMenuGuardar').on("submit", function (e) {
        SubMenuGuardar(e);
    });
    $('#formularioSubMenuEditar').on("submit", function (e) {
        SubMenuEditar(e);
    });
    selecMenu();
    selecEditMenu();
}

function SubMenuLimpiar() {
    $("#nameSubMenu").val("");
    $("#nameSubMenuEdit").val("");
    selecMenu();
    selecEditMenu();
}

function SubMenuCancelarform() {
    SubMenuLimpiar();    
    
}

function SubMenuListar() {
    SubMenutabla = $('#myTableSubMenu').dataTable({
        "aProcessing": true,
        "aServerSide": true,
        "ajax": {
            url: 'TupaSubMenu/listar',
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

function SubMenuGuardar(e) {
    e.preventDefault();
    var formData = new FormData($('#formularioSubMenuGuardar')[0]);
    $.ajax({
        url: "SubMenu/insertar",
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,

        success: function (datos) {
            swal("Se realizo el registro!", datos, "success");
            SubMenutabla.ajax.reload();
        }

    });
    $('#add-submenu').modal('hide');
    SubMenuLimpiar();
}

function SubMenuEditar(e) {
    e.preventDefault();
    var formData = new FormData($('#formularioSubMenuEditar')[0]);
    $.ajax({
        url: "SubMenu/modificar",
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,

        success: function (datos) {
            swal("Se modifico el registro!", datos, "success");
            SubMenutabla.ajax.reload();
        }

    });
    $('#edit-submenu').modal('hide');
    SubMenuLimpiar();
}

function SubMenuMostrar(idSubMenu) {
    
    $.post("SubMenu/mostrar", {idSubMenu: idSubMenu}, function (data) {
        data = JSON.parse(data);
        $("#idSubMenuEdit").val(data.tb_submenu_id);
        $("#nameSubMenuEdit").val(data.tb_submenu_name);
        $("#idMeEdit").val(data.tb_menu_id);
        

    });
}

function SubMenuEliminar(idSubMenu) {
    swal({
            title: "¿Estas seguro?",
            text: "Usted no sera capas de recuperar este registro!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                $.post("SubMenu/eliminar", {
                    idSubMenu: idSubMenu
                }, function (e) {
                    swal("Registro eliminado!", e, "success");
                    icon: "success",
                    SubMenutabla.ajax.reload();
                });
            } else {
                swal("Cancelado", "no se elimino :)", "error");
            }
        });
}

function selecMenu() {
    $.post('TupaSubMenu/secMenu', function (r) {
        $('#idMe').html(r);
    });
   
}
function selecEditMenu() {
    $.post('TupaSubMenu/secMenu', function (r) {
        $('#idMeEdit').html(r);
    });
   
}
init();