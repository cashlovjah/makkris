function bmodal() {
  //  this.name = name;
}

bmodal.prototype.createModalWindow = function (title,closeButtonClass, saveButtonClass) {
 
    $( ".mw" ).append("<div class='modal fade' id='myModal' tabindex='-1' role='dialog' aria-labelledby='myModalLabel'>" +
        "<div class='modal-dialog' role='document'>" +
        "<div class='modal-content'>" +
        "<div class='modal-header'>" +
        "<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" +
        "<h4 class='modal-title' id='myModalLabel'>"+ title+"</h4>" +
        " </div>" +
        " <div class='modal-body'>" +
        "</div>" +
        "<div class='modal-footer'>" +
        "<button type='button' class='btn btn-default " + closeButtonClass + " data-dismiss='modal'>Закрыть</button>" +
        "<button type='button' class='btn btn-primary " + saveButtonClass + " '>Сохранить</button>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" );
}

