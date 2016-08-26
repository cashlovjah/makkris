/**
 * Created by cshlovjah on 16.08.16.
 */
//Модель юзер
UserModel = Backbone.Model.extend({
    urlRoot: "/user",
    idAttribute: "_id",
    initialize: function () {
    },
    defaults: {
        id:                  null,
        password:           "123",
        confirmPassword:    "123",
        group:              "new",
        boxId:              "unknown",
        fio:                "Иван Иванович Иванов",
        status:             true,
        description:        "Пользователь",
        createOwner:        null,
        updateOwner:        null
    }
});

//Коллекция с юзерами
UserCollection = Backbone.Collection.extend({
    model: UserModel,
    url: "/user",
    parse: function (data) {
        return data;
    }

});

GroupModel = Backbone.Model.extend({
    urlRoot: "/groups",
    idAttribute: "id",
    initialize: function () {
    },
    defaults: {
        id: null,
        title: 'новый',
        name: 'new'
    }
});


Backbone.Model.prototype.idAttribute = '_id';


// Backbone Collection

var Users = Backbone.Collection.extend({
    url: '/user'
});

var users = new Users();



