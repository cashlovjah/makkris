/**
 * Created by cshlovjah on 30.08.16.
 */
var MenuItemsCollection = Backbone.Collection.extend({
    url: '/menu',
    model: ModelMenu
});