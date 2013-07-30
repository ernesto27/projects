// local storage
/*var data = [
	{
		title:"my title1",
		content: "a content1",
		timestamp: "2012"
	},
	{
		title:"my title2",
		content: "a content2",
		timestamp: "2012"
	},
]

data.push({
	title:"my title3",
	content: "a content3",
	timestamp: "2012"
})*/

/*var data = 
	{
		title:"my title1",
		content: "a content1",
		timestamp: "2012"
	}



localStorage.entries = JSON.stringify([data]);*/

// insert new data
/*
var data = 
	{
		title:"my title2",
		content: "a content2",
		timestamp: "2012"
	}

var current = JSON.parse(localStorage.entries);

current.push(data);


localStorage.entries = JSON.stringify(current);
*/

// get data

var current = JSON.parse(localStorage.entries);

for( var index in current){
	console.log(current[index].title)
}

