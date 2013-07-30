var app = app || {};

app.Post = Backbone.Model.extend({
	defaults:{
		title: "",
		content: "",
		date: new Date()
	}
});