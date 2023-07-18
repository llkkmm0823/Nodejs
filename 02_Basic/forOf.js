
let nodes = document.querySelector("ul");
for(var k=0; k <nodes.children.length; k++){
    var ch = nodes.children[k];
    ch.onclick = function(event){
        event.target.style.backgroundColor = "pink";
    }
}

/*
let nodes = documet.querySelectorAll("li");
for (var node of nodes){
     node.onclick = function(event){
        event.target.style.backgroundColor = "pink";
        console.log(k);
    }
}
*/