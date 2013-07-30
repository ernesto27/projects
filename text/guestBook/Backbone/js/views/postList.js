var app = app || {};

app.PostListView = Backbone.View.extend({

	el: "#entries-wrap",

	initialize: function(initialPosts){
		this.collection = new app.PostList(initialPosts);
		console.log(this.collection);
		this.render();
		return this;
	},

	render: function(){
		this.collection.each(function(item){
			this.renderPost(item);
		}, this);
	},

	renderPost: function(item){
		var postView = new app.PostView({
			model: item
		});
		this.$el.prepend(postView.render().el);
	},

	events:{
		"click #addEntry": "addPost"
	},

	addPost: function(e){
		e.preventDefault();
		alert("test");
	}
});


