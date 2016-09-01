function BootstrapModalWindow() {
}


BootstrapModalWindow.prototype.createModalWindow = function (object) {
    $( ".windowModal" ).empty();
    $( ".windowModal" ).append("<div class='modal fade' id='WindowModal' tabindex='-1' role='dialog' aria-labelledby='WindowModalLabel'>" +
        "<div class='modal-dialog' role='document'>" +
        "<div class='modal-content'>" +
        "<div class='modal-header'>" +
        "<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
        "<h4 class='modal-title' id='WindowModalLabel'>"+ object.title+"</h4>" +
        " </div>" +
        " <div class='modal-body'>" +
        "</div>" +
        "<div class='modal-footer'>" +
        "<button type='button' class='btn btn-default " + object.closeButtonClass + " data-dismiss='modal'>Закрыть</button>" +
        "<button type='button' class='btn btn-primary " + object.saveButtonClass + " '>Сохранить</button>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" );
};

BootstrapModalWindow.prototype.show = function () {
    "use strict";
    $('#WindowModal').modal('show');
};

BootstrapModalWindow.prototype.hide = function () {
    "use strict";
    $('#WindowModal').modal('hide');
    $( "#WindowModal" ).empty();
};
