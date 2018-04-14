//para que funcione CkEditor en Modal
$(document).on({'show.bs.modal': function () {
  $(this).removeAttr('tabindex');
} }, '.modal');