function generateCode(urlin) {
  let urlonf,xmlHttp,idgenerated;
  if(urlin == undefined) 
    urlonf = document.querySelector('#urlofimgbox').value;
  else urlonf = urlin;
  
  const namebox = document.querySelector('#skullnamebox');
  const outbox = document.querySelector('#givecmdout');
  const copybutton = document.querySelector('#copy');
  const playernamebox = document.querySelector('#playernamebox');
  const guidbox = document.querySelector('#guidbox');
  
  let texturecode = window.btoa(`{"textures":{"SKIN":{"url":"${urlonf}"}}}`);
  
  if(guidbox.value != "") {
    idgenerated = guidbox.value;
    outbox.value = `/give ${(playernamebox.value != "") ? playernamebox.value : "@p"} player_head{SkullOwner:{Id:"${idgenerated}",Name:"${namebox.value}",Properties:{textures:[{Value:"${texturecode}"}]}}}`;
    outbox.style.display = 'inline';
    copybutton.style.display = 'inline';
  } else {
    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        idgenerated = xmlHttp.responseText;
        outbox.value = `/give ${(playernamebox.value != "") ? playernamebox.value : "@p"} player_head{SkullOwner:{Id:"${idgenerated}",Name:"${namebox.value}",Properties:{textures:[{Value:"${texturecode}"}]}}}`;
        outbox.style.display = 'inline';
        copybutton.style.display = 'inline';
      }
    }
    xmlHttp.open("GET", "https://www.uuidgenerator.net/api/version4", true); // true for asynchronous 
    xmlHttp.send();
  }
}

function copy(elm) {
  elm.select();
  document.execCommand('copy');
}

function loadGitUrls() {
  let jsonFromGit,currentName,currentURL,currentLi,currentP,currentAuthorP,currentUrlP,currentBtn;
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      jsonFromGit = JSON.parse(xmlHttp.responseText).heads;
      for(var obj in jsonFromGit){
        if(jsonFromGit.hasOwnProperty(obj)){
          for(var prop in jsonFromGit[obj]){
            if(jsonFromGit[obj].hasOwnProperty(prop)) {
              currentName = prop;
              currentURL = jsonFromGit[obj][prop];
              
              currentLi = document.createElement("li");
              
              currentUrlP = document.createElement("p");
              currentUrlP.setAttribute("class","listUrl");
              currentUrlP.setAttribute("id","URL" + currentURL.NAME);
              currentUrlP.setAttribute("guid",currentURL.GUID);
              currentUrlP.appendChild(document.createTextNode(currentURL.URL));
              currentLi.appendChild(currentUrlP);
              
              currentP = document.createElement("p");
              currentP.setAttribute("class","listName");
              currentP.appendChild(document.createTextNode(currentName));
              currentLi.appendChild(currentP);
              
              currentBtn = document.createElement("button");
              currentBtn.setAttribute("type","button");
              currentBtn.setAttribute("class","liBtn");
              currentBtn.setAttribute("id",currentURL.NAME);
              currentBtn.appendChild(document.createTextNode("Use"));
              currentBtn.addEventListener("click",function() {
                document.querySelector('#urlofimgbox').value = document.querySelector('#URL' + this.id).textContent;
                document.querySelector('#skullnamebox').value = this.id;
                document.querySelector('#guidbox').value = document.querySelector('#URL' + this.id).getAttribute("guid");
              });
              currentLi.appendChild(currentBtn);
              
              currentAuthorP = document.createElement("p");
              currentAuthorP.setAttribute("class","listAuth");
              currentAuthorP.appendChild(document.createTextNode("Made by: " + currentURL.AUTHOR));
              currentLi.appendChild(currentAuthorP);
              
              document.querySelector('#urlsul').appendChild(currentLi);
            }
          }
        }
      }
    }
  }
  xmlHttp.open("GET", "heads.json", true); // true for asynchronous 
  xmlHttp.send();
  
  
}

function changeFavicon(url) {
  var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.type = (url) ? 'image/png' : 'image/gif';
  link.rel = 'shortcut icon';
  link.href = url || 'icondef.gif';
  document.getElementsByTagName('head')[0].appendChild(link);
}





