/**
 * Created by cshlovjah on 31.08.16.
 */


var MenuItemView = Backbone.View.extend({
 //Эллементы будут вставлены в список
    tagName: 'li',

    initialize: function () {
        console.log("Menu Item View");
        //    this.listenTo(this.model, "change", this.render);
        this.render();
    },


    template: $('#menu-administration').html(),

    render: function () {
        console.log("Menu item render");
        _.templateSettings = {
            interpolate: /\{\{(.+?)\}\}/g
        };
        var tmpl = _.template(this.template);

        this.$el.html(tmpl(this.model.toJSON()));
        return this;
    }
});