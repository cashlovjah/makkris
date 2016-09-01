/**
 * Created by cshlovjah on 31.08.16.
 */

//Форма
var UserModalForm = Backbone.Model.extend({
    schema: {
        group: {
            type: 'Select',
            options: [
                {val: 'new', label: "Новый"},
                {val: 'administrators', label: "Администраторы"},
                {val: 'managers', label: "Менеджеры"},
                {val: 'carMechanics', label: "Авто-слесари"}
            ]
        }
    }
});

