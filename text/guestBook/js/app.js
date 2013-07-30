function Thoughts(data){
	this.id = data.id;
	this.title = data.title;
	this.content = data.content;
	this.timestamp = data.timestamp;
}

Thoughts.prototype.formatDate = function(date){
	var day = date.getDate();
	var month = date.getMonth();
	var year = date.getFullYear();

	return  day + "/" + month + "/" + year;
};


Thoughts.prototype.tmplEntries = function(){
	var tmpl = document.createElement("div");
	tmpl.setAttribute("class", "single-entry");
	tmpl.innerHTML = 
			'<h4>'+ this.title +'</h4>'+
			'<p class="content-entry">'+ this.content +'</p>'+
			'<a href="" class="delete" data-id="'+ this.id +'">Delete</a>' +
			'<a href="" class="edit" data-id="'+ this.id +'">Edit</a>' +
			'<span class="date-entry">Creado el '+  this.formatDate(new Date(this.timestamp)) +'</span>';
	return tmpl;
};


Thoughts.prototype.insertEntries = function(){
	Thoughts.dom.wrapEntries.appendChild(this.tmplEntries());
};

Thoughts.supportsStorage = (function() {
    try {
    	return 'localStorage' in window && window['localStorage'] !== null;
    } catch(e) {
        return false;
    }
})(),


Thoughts.dom = {
	wrapEntries: document.querySelector("#entries-wrap"),
	addButton: document.querySelector("#addThought"),
	editWrap: document.querySelector("#wrapper-edit"), 
	addWrap: document.querySelector("#wrapper-add"), 
	addWrap: document.querySelector("#wrapper-add"), 
	editButton: document.querySelector("#editThrougt"), 
	cancelButton: document.querySelector("#cancelEdit"),
	currentIdToEdit: null 
};


Thoughts.events = {

	init: function(){
		Thoughts.dom.addButton.addEventListener("click", this.addEntry,false);
		Thoughts.dom.wrapEntries.addEventListener("click", this.optionsEntry,false);
		Thoughts.dom.editButton.addEventListener("click", this.editEntry, false);
		this.getEntries();
	},

	addEntry: function(e){	
		e.preventDefault();
		var data = {
			id: date.getTime(),
			title: document.querySelector("#title").value,
			content: document.querySelector("#content").value,
			timestamp: new Date()
		};

		Thoughts.events.saveToLocalStorage(data);
				
		var insert = new Thoughts(data);
		insert.insertEntries();		
	},

	

	getEntries: function(){
		if(localStorage.entries !== undefined){
			var current = JSON.parse(localStorage.entries);
			for( var index in current){
				var temp = new Thoughts(current[index]);
				temp.insertEntries();
			}
		}
	},


	optionsEntry: function(e){
		e.preventDefault();
		var target = e.target
		var entry = target.parentNode;
		var id = target.getAttribute("data-id");
		
		if(target.className === "delete"){
			Thoughts.events.deleteEntry(entry, id);

		}else if(target.className === "edit"){
			Thoughts.dom.currentIdToEdit = id;
			Thoughts.dom.addWrap.style.display = "none";
			Thoughts.dom.editWrap.style.display = "block";

			var currentEntry = target.parentNode.children;
			var formAdd = Thoughts.dom.editWrap.children[1].children;
			var title = formAdd[1];
			var content = formAdd[3]
			
			title.value = currentEntry[0].innerHTML;
			content.value = currentEntry[1].innerHTML;
		}	
	},

	deleteEntry: function(entry ,id){
		var current = JSON.parse(localStorage.entries);

		for( var index in current){
			if(current[index].id == id){
				current.splice(index,1);
				entry.parentNode.removeChild(entry);
			}
		}
		localStorage.entries = JSON.stringify(current);
	},

	editEntry: function(e){
		e.preventDefault();
		console.log(e.target)
		var title = document.querySelector("#title-edit").value;
		var content = document.querySelector("#content-edit").value;

		console.log(title, content);
		var id = Thoughts.dom.currentIdToEdit;

		var current = JSON.parse(localStorage.entries);

		for( var index in current){
			if(id == current[index].id){
				current[index].title = title;
				current[index].content = content;
			}
		}

		localStorage.entries = JSON.stringify(current);

		var n = Thoughts.dom.wrapEntries;
			while(n.firstChild){
			n.removeChild(n.firstChild);
		}

		Thoughts.events.getEntries();
	},

	HandlerCancelEdit: function(){
		Thoughts.dom.cancelButton.addEventListener("click", function(e){
			e.preventDefault();
			Thoughts.dom.addWrap.style.display = "block";
			Thoughts.dom.editWrap.style.display = "none";
		}, false);
	},

	saveToLocalStorage: function(data){
		if(localStorage.entries !== undefined){
			var current = JSON.parse(localStorage.entries);
			current.push(data);
			localStorage.entries = JSON.stringify(current);
		}else{
			localStorage.entries = JSON.stringify([data]);
		}
	}
}

Thoughts.events.init();























