var Editor = function(){

	var file    = document.querySelector("#file"),
		content = document.querySelector("#result"),
		save    = document.querySelector("#save"),
		nameFile,
		supportFile
	;

	function supportFileReader(){
		if (window.File && window.FileReader && window.FileList && window.Blob){
			supportFile = true;
			return true;
		}else{
			supportFile = false;
		}
	}

	function replaceTagsLineBreak(text){
		var t = text.replace(/</g, '&lt;')
					.replace(/>/g, '&gt;')
	         		.replace(/\t/g,"&nbsp;&nbsp;&nbsp;&nbsp;")
	          		.replace(/\n/g,"<br>");
	    return t;
	}

	function formatTextToSave(text){
		var t = text.replace(/&lt;/g, '<')
					.replace(/&gt;/g, '>')
	         		.replace(/&nbsp;*/g,"\t")
	          		.replace(/<br>/g,"\n")
	          		.replace(/<\/?div>/g,"\n");
	     
	    return t;
	}

	function getFileName(){
		return nameFile;
	}
		
	var app = {
		getFile: function(){
			if(supportFile){
				file.addEventListener("change", function(e){
					var file = e.target.files[0];
					nameFile = file.name;

					var reader = new FileReader();

					reader.onload = (function(theFile) {
			        	return function(e) {
			      			var text = replaceTagsLineBreak(e.target.result);
			      			content.innerHTML = text;
			        	};
			     	 })(file);	

			    	reader.readAsText(file,"UTF-8");
				});
			}
			
		},

		saveFile: function(){
			save.addEventListener("click",function(){
				var text = content.innerHTML
				var textFormat = formatTextToSave(text);
				console.log(textFormat)
				return;
				var blob = new Blob([textFormat], { type: "text/plain" });
				var downloadLink = document.createElement("a");
				downloadLink.download = getFileName();

				if (window.webkitURL != null){
					downloadLink.href = window.webkitURL.createObjectURL(blob);
				}else{
					downloadLink.href = window.URL.createObjectURL(blob);
					downloadLink.style.display = "none";
					document.body.appendChild(downloadLink);
					downloadLink.onclick = function(e){
						document.body.removeChild(e.target);
					} 
				}
				
				downloadLink.click();
			});
		},

		init: function(){
			supportFileReader();
			app.getFile();
			app.saveFile();
			


		}
	}

	return{
		init: app.init
	}

}


new Editor().init();



/*if (window.File && window.FileReader && window.FileList && window.Blob) {
	
	document.querySelector("#file").addEventListener("change", function(e){
		var file = e.target.files[0];
		
		var reader = new FileReader();

		reader.onload = (function(theFile) {
	        return function(e) {
	          var text = e.target.result;
	           
	          var t = text.replace(/</g, '&lt;').replace(/>/g, '&gt;')
	         			.replace(/\t/g,"&nbsp;&nbsp;&nbsp;&nbsp;")
	          			.replace(/\n/g,"<br>");

	          document.querySelector("#result").innerHTML = t; 
	          	
	        };
	      })(file);	

	    reader.readAsText(file,"UTF-8");

		
	},false);


	// save file
	document.querySelector("#save").addEventListener("click",function(){
		var text = document.querySelector("#result").innerHTML
		var blob = new Blob([text], { type: "text/plain" });
		var downloadLink = document.createElement("a");
		downloadLink.download = "test.txt";

		if (window.webkitURL != null){
			downloadLink.href = window.webkitURL.createObjectURL(blob);
		}else{
			downloadLink.href = window.URL.createObjectURL(blob);
			downloadLink.style.display = "none";
			document.body.appendChild(downloadLink);
			downloadLink.onclick = function(e){
				document.body.removeChild(e.target);
			} 
		}
		
		downloadLink.click();

	},false)

} else {
  alert('The File APIs are not fully supported in this browser.');
}*/