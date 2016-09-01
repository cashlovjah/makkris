//Коллекция эллементов меню


var menuItemsCollection = new MenuItemsCollection;

menuItemsCollection.fetch({
        success: function (data) {
            "use strict";
            var menu = new MenuItemsView({collection: data});
        }

    }
)


