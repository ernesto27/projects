var app = app || {};

app.PostView = Backbone.View.extend({
	tagName: "div",
	className: "single-entry",
	template: _.template($( '#postTmpl' ).html()),

	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},

	events:{
		"click .delete": "deletePost"
	},

	deletePost: function(e){
		e.preventDefault();
		console.log(this.model.destroy());
		console.log(this.remove())
	}
});


//var p = new app.Post({title: "test", content: "content test"});
//var v = new app.PostView({ model: p});
