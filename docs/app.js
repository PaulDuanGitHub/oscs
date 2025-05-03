async function update() {
    // Fetch all releases and update the <ul> label  
    fetch('https://api.github.com/repos/mac-egirls/oscs/releases?tag_name=latest')
    .then(res => {
        if(res) {
            res.json().then(
                data => {
                    var list = data[0].assets;
                    var publish_time = new Date(data[0].published_at).toString();

                    document.getElementById("update-time").innerText = publish_time;
                    for (var i = 0; i < list.length - 1; i++) {
                        var ul = document.getElementById("list");
                        var li = document.createElement("li");
                        li.setAttribute("onclick", "select(event)");
                        li.setAttribute("ondblclick", "openFile()");
                        var icon = document.createElement("div");
                        icon.className = "pdf-icon";
                        var div = document.createElement('div');
                        div.innerText = `${list[i].name}`;
                        li.appendChild(icon);
                        li.appendChild(div)
                        ul.appendChild(li);
                     }
                }
            )
        }
    });
}

function select(event) {
    console.log(event);
    var li = event.target.parentNode;
    var ul = event.target.parentNode.parentNode;
    for (i = 0; i < ul.children.length; i++){
        if(ul.children[i] == li){
            ul.children[i].classList.add("selected");
            document.getElementById("preview").setAttribute("src",`./pdf-viewer/web/viewer.html?file=${event.target.innerText}`)
        }else{
            ul.children[i].classList.remove("selected")
        }
    }
}

function view(event) {
    var link = document.createElement('a');
    console.log(event);
    var name = event.target.innerText;
    link.href = `./pdf-viewer/web/viewer.html?file=${name}`;
    link.target = "_blank";
    link.click();
}

function downloadFile(){
    var selected = document.getElementsByClassName("selected");
    if (selected.length != 0){

        var link = document.createElement('a');
        link.href = `https://github.com/mac-egirls/oscs/releases/download/latest/${selected[0].innerText}`
        link.target = "_blank";
        link.click();
    }else{
        alert("Please select one file")
    }
}

function openFile(){
    var selected = document.getElementsByClassName("selected");
    if (selected.length != 0){

        var link = document.createElement('a');
        link.href = `https://github.com/mac-egirls/oscs/releases/download/latest/${selected[0].innerText}`
        link.target = "_blank"
        link.click();
    }else{
        alert("Please select one file")
    }
}

function openGitHub(){
    var link = document.createElement('a');
    link.href = 'https://github.com/mac-egirls/oscs'
    link.target = "_blank"
    link.click();
}
