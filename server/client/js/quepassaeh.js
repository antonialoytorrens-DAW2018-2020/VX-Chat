const URL_LOGIN="http://iesmantpc.000webhostapp.com/public/login/";
const URL_ENVIAMISSATGE="http://iesmantpc.000webhostapp.com/public/missatge/"
const URL_LLEGIR="http://iesmantpc.000webhostapp.com/public/missatge/"
var mlsg=6000;
var nomgalleta='quepassaehNom';
var pswgalleta='quepassaehPsw';

window.onload = function() {
  var boto = document.getElementById('btlogin');
  document.getElementById('pswdiv').style.display='block';
  document.getElementById('chatdiv').style.display='none';
  document.getElementById('errorlogindiv').style.visibility='hidden';
  document.getElementById('nom').value=getCookie(nomgalleta);
  document.getElementById('psw').value=getCookie(pswgalleta);
  document.getElementById('nom').onchange=posaGalleta;
  document.getElementById('psw').onchange=posaGalleta;
  boto.onclick = validaLogin;   
}
  
function agafaObjecte() {
 if (window.XMLHttpRequest) {
  return(new XMLHttpRequest());
 } else {
  if (window.ActiveXObject) { 
   return(new ActiveXObject("Microsoft.XMLHTTP"));
   } else { return(null);}
 }
}

function validaLogin () {
 var dades;
 var nom=document.getElementById('nom').value;
 var psw=document.getElementById('psw').value;
 dades =agafaObjecte();
 dades.onreadystatechange = function() { validaLogin_fer(dades); };
 dades.open("POST",URL_LOGIN, true);
 dades.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
 dades.send("nom="+nom+"&password="+psw);           
}

function validaLogin_fer(dades) {
  if(dades.readyState == 4) {
    if(dades.status == 200) {
      var resposta=JSON.parse(dades.responseText);
      var ok=resposta.correcta;
      
      if (ok) {
       var codiusuari=resposta.dades.codiusuari;
       document.getElementById('codiusuari').value=codiusuari;
       var nomusuari=resposta.dades.nom;
       document.getElementById('nomusuari').textContent=nomusuari;
       document.getElementById('pswdiv').style.display='none';
       document.getElementById('chatdiv').style.display='block';
       var boto = document.getElementById('btnoumsg');
       boto.onclick=enviaMissatge;
       mostraSpin();
       carregaMissatges();
       interval = setInterval(carregaMissatges, mlsg);
      } else {
       document.getElementById('errorlogindiv').style.visibility='visible';
      }
    }
  }
}

function enviaMissatge() {
 var dades;
 var msg=document.getElementById('noumissatge').value;
 dades =agafaObjecte();
 dades.onreadystatechange = function() { enviaMissatge_mostra(dades,msg); };   
 dades.open("POST",URL_ENVIAMISSATGE, true);
 dades.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
 dades.send("missatge="+msg);           
}

function enviaMissatge_mostra(dades,msg) {    
  if(dades.readyState == 4) {
    var msg = document.getElementById('noumissatge');        
    if(dades.status == 200) {
        carregaMissatges();
        msg.value='';
    } else {
       msg.innerHTML='Error enviant missatge '; 
    }      
  }
}

function carregaMissatges() {
 var dades;   
 dades =agafaObjecte();
 dades.onreadystatechange = function() { mostraMissatges(dades); };   
 dades.open("GET",URL_LLEGIR, true);
 dades.send(null);        
}

function formataData(d) {
    var dia=d.substr(8,2);
    var mes=d.substr(5,2);
    var anio=d.substr(0,4);
    var hora=d.substr(11,2);
    var min=d.substr(14,2);
    return dia+'-'+mes+'-'+anio+' '+hora+':'+min;
}

function mostraMissatges(dades) {    
  if(dades.readyState == 4) {
    var msg = document.getElementById('missatges');
    
    if(dades.status == 200) {
      ocultaSpin();  
      var resposta= JSON.parse(dades.responseText);
      // Sessió no iniciada
      if (!resposta.correcta) {
       msg.innerHTML='<h3><p class="bg-danger text-center">Sessió no iniciada</p></h3>';   
      }
      else {
       var json=resposta.dades; 
       for (i in json) { 
         var fila=document.createElement("li");
         fila.setAttribute('class','list-group-item');
         if (json[i].codiusuari==json[i].usuariactual) {
           fila.setAttribute('style','background-color:#ccffff');
         } else {
           fila.setAttribute('style','background-color:#ccffcc');  
         }
         var span=document.createElement("span");
         span.setAttribute('style', 'font-size:9px');
         span.setAttribute('class', 'badge');
         span.innerHTML=formataData(json[i].datahora)+' '+json[i].nom;
         fila.appendChild(span);
         var p=document.createElement("p");
         p.setAttribute('style', 'font-size:14px');
         p.innerHTML=json[i].msg;;
         fila.appendChild(p);                     
         msg.appendChild(fila);
      }
      } 
    } else {
       msg.innerHTML='Error carregant cua '; 
    }      
  }
}

function ocultaSpin() {
 document.getElementById('spin').style.visibility='hidden';  
}

function mostraSpin() {
 document.getElementById('spin').style.visibility='visible';   
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1);
      if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
  }
  return "";
}

function posaGalleta() {
  var nom=document.getElementById('nom').value;
  setCookie(nomgalleta,nom,30);
  var psw=document.getElementById('psw').value;
  setCookie(pswgalleta,psw,30);    
}
