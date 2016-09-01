/**
 * Created by cshlovjah on 31.08.16.
 */

modalWindowForm.userEdit = function () {
    "use strict";
    var windowObject = {
        title: "Управление пользователями",
        closeButtonClass: "closeWindowModal",
        saveButtonClass: "saveWindowModal"
    };
    //Создаем окно
    var userControlWindow = new BootstrapModalWindow();

    //Вставляем окно
    userControlWindow.createModalWindow(windowObject);

    //Отображаем окно
    userControlWindow.show();

    //Открыть мадальное окно
    var userModalForm = new UserModalForm({group: 'new'});

    //Отрендерить форму
    var form = new Backbone.Form({
        model: userModalForm
    }).render();

    //Вывести форму в модальное окно
    $('.modal-body').append(form.el);
}


