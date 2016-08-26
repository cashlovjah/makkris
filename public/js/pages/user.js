/**
 * Created by cshlovjah on 29.07.16.
 */
function User() {
}

User.prototype.pageableTable = function (usertableid) {
    "use strict";
    var groups = {
        new: "новый",
        administrators: "Администраторы",
        managers: "Менеджеры",
        carMechanics: "Авто-слесаря"
    }

    //Столбец состояния вкл/откл пользователь
    var StatusCell = Backgrid.Cell.extend({
        events: {
            'click .toggleSw': 'toggleSwitch'
        },

        toggleSwitch: function (e) {
            e.preventDefault();
            var thisModel = new UserModel({
                urlRoot: "/user",
                idAttribute: "_id"
            });
            console.log(thisModel);
            thisModel = this.model;
            (thisModel.get('status')) ? thisModel.set({status: false}) : thisModel.set({status: true});
            console.log(thisModel.changedAttributes());
            thisModel.save(thisModel.changedAttributes(), {patch: true});
        },
        render: function () {
            var statusClass = "";
            (this.model.get('status')) ? statusClass = "alert-success " : statusClass = "alert-danger ";
            this.$el.html('<button class=\"' + statusClass + 'btn btn-default button_centered toggleSw" ><span class="glyphicon glyphicon-off" aria-hidden="true"></span></button>');
            return this;
        }
    });


    //Группы
    var GroupSelector = Backgrid.Cell.extend({


        events: {
            'click .changeGroupButton': 'changeGroup'
        },

        changeGroup: function (e) {
            $('.mw').empty();
            e.preventDefault();
            console.log("Нажал изменить");

            var modalWindow = new bmodal();
            //Устанавливаем Title окна, кнопку закрытия и сохранения
            modalWindow.createModalWindow('Изменить группу', 'closeUserWindowModal', 'saveGroupButtonWindowModal');

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

            //Открыть мадальное окно
            var userModalForm = new UserModalForm({group: 'new'});

            //Отрендерить форму
            var form = new Backbone.Form({
                model: userModalForm
            }).render();


            //Вывести форму в модальное окно
            $('.modal-body').append(form.el);

            $('.closeUserWindowModal').click(function () {
                $('.mw').empty();
            });


            form.setValue({value: 'new'});

            var thisModel = this.model;
            $('.saveGroupButtonWindowModal').click(function (e) {
                //  console.log(this.model);
                var errors = form.commit(); // runs schema validation
                if (errors) {

                    var options = {};
                    // Run the effect
                    $("#myModal").effect("shake");

                } else {
                    var data = form.getValue();

                    //далее сохраняем модель
                    //  console.log(data)

                    console.log(thisModel);
                    thisModel.set(data);

                    console.log("Изменили: " + JSON.stringify(thisModel.changedAttributes()));
                    thisModel.save(thisModel.changedAttributes(), {patch: true});
                    $('.mw').empty();
                }
            });


        },
        render: function () {

            this.$el.html('<button class="btn btn-default button_centered changeGroupButton" data-toggle="modal" data-target="#myModal">' +
                '<span class="groupsUsers glyphicon glyphicon-search ' + groups[this.model.get('group')] + '" aria-hidden="true"></span> ' +
                '' + groups[this.model.get('group')] + '' +
                '</button>');
            return this;

        }
    });


    //Столбец сброса или установки пароля
    var ResetPassword = Backgrid.Cell.extend({
        events: {
            'click .resetPasswordButton': 'resetPassword'
        },

        resetPassword: function (e) {
            $('.mw').empty();
            console.log('reset password');
            e.preventDefault();
            var thisModel = new UserModel({
                urlRoot: "/user",
                idAttribute: "_id"
            });
            console.log(thisModel);
            thisModel = this.model;
            var modalWindow = new bmodal();

            //Устанавливаем Title ля окна, кнопку закрытия и сохранения
            modalWindow.createModalWindow('Сброс пассворда', 'closeUserWindowModal', 'saveUserWindowModal');
            var UserModalForm = Backbone.Model.extend({
                schema: {
                    password: {
                        type: 'Password',
                        validators: ['required']
                    },
                    confirmPassword: {
                        type: 'Password',
                        validators: [
                            'required',
                            {type: 'match', field: 'password', message: 'Пароли не совпадают!'}
                        ]
                    }
                }
            });

            //Открыть мадальное окно
            var userModalForm = new UserModalForm();

            //Отрендерить форму
            var form = new Backbone.Form({
                model: userModalForm
            }).render();

            //Вывести форму в модальное окно
            $('.modal-body').append(form.el);
            $('.closeUserWindowModal').click(function () {
                $('.mw').empty();
            });

            $('.saveUserWindowModal').click(function () {

                var errors = form.commit(); // runs schema validation
                if (errors) {

                    var options = {};
                    // Run the effect
                    $("#myModal").effect("shake");

                } else {
                    var data = form.getValue();
                    //далее сохраняем модель
                    //  console.log(data)
                    thisModel.set(data);
                    console.log("Изменения: " + thisModel.changedAttributes());
                    thisModel.save(thisModel.changedAttributes(), {patch: true})
                    $('.mw').empty();
                }
            });
        },
        render: function () {
            this.$el.html('<button class="btn btn-default button_centered resetPasswordButton" data-toggle="modal" data-target="#myModal"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>');
            return this;
        }
    });

    var ActionCell = Backgrid.Cell.extend({
        events: {
            'click .removeButton': 'deleteRow',
            'click .saveButton': 'saveRow'
        },
        deleteRow: function (e) {
            console.log('Delete');
            e.preventDefault();
            var thisModel = new UserModel({
                urlRoot: "/user",
                idAttribute: "_id"
            });
            console.log(thisModel);
            thisModel = this.model;
            thisModel.destroy({
                success: function (model, response) {
                }
            });
        },

        saveRow: function (e) {
            console.log("save");
            e.preventDefault();
            var thisModel = new UserModel({});

            thisModel = this.model;
            if (thisModel.changedAttributes()) {
                thisModel.save(thisModel.changedAttributes(), {patch: true})
            }

        },
        render: function () {
            this.$el.html('<div class="button_centered"><button class="btn btn-default button_margin removeButton"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button><button class="btn btn-default button_margin saveButton"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span></button></div>');
            return this;
        }
    });

    var columns = [{

        name: "username",
        label: "Имя пользователя",
        // The cell type can be a reference of a Backgrid.Cell subclass, any Backgrid.Cell subclass instances like *id* above, or a string
        cell: "string" // This is converted to "StringCell" and a corresponding class in the Backgrid package namespace is looked up
    }, {
        name: "",
        label: "Пароль",
        cell: ResetPassword
    }, {
        name: "group",
        label: "Группа",
        cell: GroupSelector, // An integer cell is a number cell that displays humanized integers
        editable: false
    }, {
        name: "fio",
        label: "Фио",
        cell: "string" // A cell type for floating point value, defaults to have a precision 2 decimal numbers
    }, {
        name: "status",
        label: "Состояние",
        cell: StatusCell
    }, {
        name: "description",
        label: "Описание",
        cell: "string"
    }, {
        name: "createOwner",
        label: "Создал",
        cell: "string",
        editable: false
    }, {
        name: "updateOwner",
        label: "Редактировал",
        cell: "string",
        editable: false
    }, {
        name: "createDate",
        label: "Дата создания",
        cell: "date",
        editable: false
    }, {
        name: "updateDate",
        label: "Дата изменения",
        cell: "date", // Renders the value in an HTML anchor element
        editable: false
    }, {
        name: '',
        label: 'Действие',
        cell: ActionCell
    }];

    // var Territory = Backbone.Model.extend({});

    var PageableUsers = Backbone.PageableCollection.extend({
        model: UserModel,
        url: "/user",
        state: {
            pageSize: 15
        },
        mode: "client" // page entirely on the client side
    });

    var pageableUsers = new PageableUsers();

    $('.main-container').append('<div class="button-panel"><button class="btn btn-default alert-info createUser">Создать</button></div>');

// Set up a grid to use the pageable collection
    var pageableGrid = new Backgrid.Grid({
        columns: [{
            // enable the select-all extension
            name: "",
            cell: "select-row",
            headerCell: "select-all"
        }].concat(columns),
        collection: pageableUsers
    });

// Render the grid
    var $userTable = $("#" + usertableid);
    $userTable.append(pageableGrid.render().el);

// Initialize the paginator
    var paginator = new Backgrid.Extension.Paginator({
        collection: pageableUsers
    });

// Render the paginator
    $userTable.after(paginator.render().el);

// Initialize a client-side filter to filter on the client
// mode pageable collection's cache.
    var filter = new Backgrid.Extension.ClientSideFilter({
        collection: pageableUsers,
        fields: ['username']
    });

// Render the filter
    $userTable.before(filter.render().el);

// Add some space to the filter and move it to the right
    $(filter.el).css({float: "right", margin: "20px"});

// Fetch some data
    pageableUsers.fetch({reset: true});

    $('.createUser').click(function () {
        var newUser = new UserModel();
        console.log(newUser);
        pageableUsers.add(newUser);
    });
}