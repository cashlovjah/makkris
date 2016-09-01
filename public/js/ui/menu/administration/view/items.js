/**
 * Created by cshlovjah on 31.08.16.
 */

var MenuItemsView = Backbone.View.extend({

    el: 'ul#administrationMenu',
    events: {
        'click .user-control': 'userControl',
        'click .boxes-control': 'boxesControl',
        'click .posts-control': 'postsControl',
        'click .typeOfWork-control': 'typeOfWorkControl',
        'click .customer-control': 'customerControl',
        'click .log-control': 'logControl',

    },
    initialize: function () {
        console.log("Menu Items View");
        this.render();
    },

    render: function () {

        this.$el.html('');

        this.collection.each(function (model) {
            var menuItemView = new MenuItemView({
                model: model
            });

            this.$el.append(menuItemView.render().el);

        }.bind(this));

        return this;
    },

    userControl: function (e) {
        e.preventDefault();
        "use strict";
        console.log("UserControl");
        //modalWindowForm.userEdit();

    }

});