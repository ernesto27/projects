var RSSNettus = {
  loading: document.getElementById("loading"),

  getData: function(){
    var req = new XMLHttpRequest();
    req.open("GET", "http://feeds.feedburner.com/nettuts?format=xml", true);
    RSSNettus.loading.style.display = "block";
    req.onload = this.addPost.bind(this);
    req.send(null);
  },

  addPost: function(e){
    var wrap = document.getElementById("post-wrap");
    console.log(e.target.responseXML.querySelectorAll('item'))

    var post = e.target.responseXML.querySelectorAll('item');
    RSSNettus.loading.style.display = "none";

      for( var i = 0; i < post.length; i++ ){
        var titlePost = post[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
        var linkPost = post[i].getElementsByTagName("link")[0].childNodes[0].nodeValue;
        
        var div = document.createElement("div");
        div.className = "single-post";
        var title = document.createElement("p");
        title.innerHTML = titlePost;
        var link = document.createElement("a");
        link.setAttribute("target","_blank");
        link.href = linkPost;

        wrap.appendChild(div);
        link.appendChild(title);
        div.appendChild(link);
      }


    

    
  }
}





document.addEventListener('DOMContentLoaded', function () {
  RSSNettus.getData();
});
