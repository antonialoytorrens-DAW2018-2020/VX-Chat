const scripts = document.getElementsByTagName('script');
const path = scripts[scripts.length - 1].src.split('?')[0];
const mydir = path.split('/').slice(0, -1).join('/') + '/';
const URL_LOGIN = mydir + "../../server/public/login/";
const URL_GRAFIC = mydir + "../../server/public/grafic/";
const URL_ENVIAMISSATGE = mydir + "../../server/public/missatge/";
const URL_LLEGIR = mydir + "../../server/public/missatge/";
const URL_PERFIL = mydir + "../../server/public/usuari/";
var mlsg = 6000;
var nomgalleta = 'vxChat-Nom';
var pswgalleta = 'vxChat-Psw';

window.onload = function () {
  carregaInici();
}

function carregaInici() {
  document.getElementById("general").setAttribute("style", "margin-top: 0rem");
  fadeIn(document.getElementById('pswdiv'), 1000);
  document.getElementById('pswdiv').setAttribute("style", "display: block");
  document.getElementById('pswregistre').setAttribute("style", "display: none");
  document.getElementById('message-container').setAttribute("style", "display: none");
  document.getElementById('chatdiv').setAttribute("style", "display: none !important");
  document.getElementById('logindiv').setAttribute("style", "display: none !important");
  document.getElementById('perfildiv').setAttribute("style", "display: none");
  document.getElementById('errorlogindiv').setAttribute("style", "display: none");
  document.getElementById('graphicdiv').setAttribute("style", "display: none");
  document.getElementById('nom').value = getCookie(nomgalleta);
  document.getElementById('psw').value = getCookie(pswgalleta);

  carregaOnFocusElements();

  tancaDropdown();

  document.getElementById("nom").addEventListener("change", function () {
    posaGalleta();
  });

  document.getElementById("psw").addEventListener("change", function () {
    posaGalleta();
  });

  carregaOnClickElements();

  speak("Estás en la sección de inicio de sesión.");
}

function registreUsuari() {
  document.getElementById("general").setAttribute("style", "margin-top: 0rem");
  speak("Estás en la sección de registro");
  let registre = document.getElementById('pswregistre');
  document.getElementById('pswdiv').setAttribute("style", "display: none");
  document.getElementById('chatdiv').setAttribute("style", "display: none !important");
  document.getElementById('logindiv').setAttribute("style", "display: none !important");
  document.getElementById('message-container').setAttribute("style", "display: none");
  document.getElementById('errorUsuariRegistreDiv').setAttribute("style", "display: none");
  document.getElementById('errorUsuariRegistreDiv2').setAttribute("style", "display: none");
  document.getElementById('errorContrasenyaRegistreDiv').setAttribute("style", "display: none");
  registre.setAttribute("style", "display: block");
  fadeIn(registre, 1000);
  document.getElementById('perfildiv').setAttribute("style", "display: none");
  document.getElementById('errorlogindiv').setAttribute("style", "display: none");
}

function afegeixUsuari(rq) {
  var nom = document.getElementById('nom-registre').value;
  var email = document.getElementById('email-registre').value;
  var psw = document.getElementById('psw-registre').value;
  var psw2 = document.getElementById('psw-registre2').value;

  // LES CONTRASENYES NO COINCIDEIXEN

  if (psw != psw2) {
    document.getElementById("errorContrasenyaRegistreDiv").setAttribute("style", "display: block;");
    speak(document.getElementById("errorContrasenyaRegistreDiv").textContent);
  } else {
    document.getElementById("errorContrasenyaRegistreDiv").setAttribute("style", "display: none;");
  }

  // NOM O EMAIL BUIT

  if (isEmptyOrSpaces(nom) || isEmptyOrSpaces(email)) {
    document.getElementById("errorUsuariRegistreDiv").setAttribute("style", "display: block;");
    speak(document.getElementById("errorUsuariRegistreDiv").textContent);
  } else {
    document.getElementById("errorUsuariRegistreDiv").setAttribute("style", "display: none;");
  }

  // LES CONTRASENYES COINCIDEIXEN A L'HORA DE REGISTRAR-SE

  if (psw == psw2 && !isEmptyOrSpaces(nom) && !isEmptyOrSpaces(email)) {
    // REGISTRA L'USUARI
    rq.open("POST", URL_PERFIL, true);
    rq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    var token = document.getElementById('token').value;
    rq.setRequestHeader('Authorization', token);
    rq.send("nom=" + nom + "&email=" + email + "&password=" + psw);
    rq.onreadystatechange = function () {
      if (rq.status == 200 && rq.readyState == 4) {
        var resposta = JSON.parse(rq.responseText);
        if (resposta.correcta == false) {
          document.getElementById('errorUsuariRegistreDiv2').setAttribute("style", "display: block");
          speak(document.getElementById('errorUsuariRegistreDiv2').textContent);
        } else {
          var note_message = document.getElementById('note_message');
          note_message.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i><b>Registro completado con éxito.</b>';
          showIt(document.getElementById("modal"));
          document.getElementById('nom-registre').innerHTML = '';
          document.getElementById('email-registre').innerHTML = '';
          document.getElementById('psw-registre').innerHTML = '';
          document.getElementById('psw-registre2').innerHTML = '';
          carregaInici();
        }
      }
    };
  }
}

function editaperfil() {
  document.getElementById("general").setAttribute("style", "margin-top: 0rem");
  speak("Estás en la sección de perfil");
  document.getElementById('pswdiv').setAttribute("style", "display: none");
  document.getElementById('errormodperfil').setAttribute("style", "display: none !important");
  document.getElementById('chatdiv').setAttribute("style", "display: none !important");
  document.getElementById('message-container').setAttribute("style", "display: none");
  document.getElementById('perfildiv').setAttribute("style", "display: block");
  fadeIn(document.getElementById('perfildiv'), 1000);
  document.getElementById('graphicdiv').setAttribute("style", "display: none");
  document.getElementById('perfilnom').value = document.getElementById('nom_usuari').value;
  document.getElementById('perfilemail').value = document.getElementById('email_usuari').value;
}

function agafaObjecte() {
  if (window.XMLHttpRequest) {
    return (new XMLHttpRequest());
  } else {
    if (window.ActiveXObject) {
      return (new ActiveXObject("Microsoft.XMLHTTP"));
    } else { return (null); }
  }
}

function validaLogin(rq) {
  var email = document.getElementById('nom').value;
  var psw = document.getElementById('psw').value;
  rq.onreadystatechange = function () { validaLogin_fer(rq); };
  rq.open("POST", URL_LOGIN, true);
  rq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  rq.send("email=" + email + "&password=" + psw);
}

function validaLogin_fer(rq) {
  if (rq.readyState == 4) {
    if (rq.status == 200) {
      var resposta = JSON.parse(rq.responseText);
      var ok = resposta.correcta;

      if (ok) {
        var dades = resposta.dades;
        var codiusuari = dades.codiusuari;
        document.getElementById('codiusuari').value = codiusuari;
        var nomusuari = dades.nom;
        var emailusuari = dades.email;
        document.getElementById('nomusuari').textContent = nomusuari;
        document.getElementById('nom_usuari').value = nomusuari;
        document.getElementById('email_usuari').value = emailusuari;
        var token = dades.token;
        document.getElementById('token').value = token;
        carregaXat(rq);
      } else {
        document.getElementById('errorlogindiv').setAttribute("style", "display: initial");
        speak(document.getElementById("errorlogindiv").textContent);
      }
    }
  }
}

function carregaXat(rq) {
  speak("Estás en la sección de mensajes");
  document.getElementById('pswdiv').setAttribute("style", "display: none");
  document.getElementById('perfildiv').setAttribute("style", "display: none");
  document.getElementById('graphicdiv').setAttribute("style", "display: none");
  document.getElementById('message-container').setAttribute("style", "display: flex");
  var chatdiv = document.getElementById('chatdiv');
  chatdiv.setAttribute("style", "display: block");
  document.getElementById("error-message-container").setAttribute("style", "display: none;");
  fadeIn(chatdiv, 1000);
  var message_container = document.getElementById('message-container');
  fadeIn(message_container, 1000);
  var logindiv = document.getElementById('logindiv');
  logindiv.setAttribute("style", "display: block");
  var boto = document.getElementById('btnoumsg');
  var boto_graphic = document.getElementById('btgraphic');

  carregaDropdown();
  estaObertDropdown();

  boto.addEventListener("click", function () {
    if (isEmptyOrSpaces(document.getElementById("noumissatge").value)) {
      let note_message = document.getElementById("note_message");
      note_message.innerHTML = '<i class="fas fa-times" aria-hidden="true"></i><b> El mensaje no puede estar en blanco.</b>';
      showIt(document.getElementById("modal"));
      speak("Error al enviar el mensaje. No puede estar en blanco.");
    } else {
      var rq = agafaObjecte();
      enviaMissatge(rq);
    }
  });

  document.getElementById('nomusuari').addEventListener("click", function () {
    carregaDropdown();
  });

  // Envia missatge quan es prem ENTER al textarea. S'envien molts missatges a la vegada?

  /*document.getElementById("noumissatge").addEventListener("keypress", function (e) {
    var keyCode = e.keyCode;
    // Tecla ENTER i l'element està seleccionat
    var isFocused = (document.activeElement === this);
    if (isFocused && keyCode == 13) {
      var rq = agafaObjecte();
      enviaMissatge(rq);
    }
  });*/

  mostraSpin();
  carregaMissatges(rq);
  //interval = setInterval(carregaMissatges, mlsg);
  document.getElementById("logout").addEventListener("click", function () {
    carregaInici();
  });
  boto_graphic.addEventListener("click", function () {
    var rq = agafaObjecte();
    construeixGrafic(rq);
    veureGrafic();
  });
}

function construeixGrafic(rq) {
  rq.onreadystatechange = function () { creaGrafic(rq); };
  rq.open("POST", URL_GRAFIC, true);
  rq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  rq.send(null);
}

function veureGrafic() {
  // L'SPEECH DE LA LOCALITZACIÓ ES TROBA A creaGrafic(rq)
  document.getElementById("general").setAttribute("style", "margin-top: 0rem");
  document.getElementById('chatdiv').setAttribute("style", "display: none !important");
  document.getElementById('perfildiv').setAttribute("style", "display: none");
  document.getElementById('message-container').setAttribute("style", "display: none");
  document.getElementById('graphicdiv').setAttribute("style", "display: flex");
}

function creaBlocMissatge(datahora, codiusuari, nom, codimissatge, missatge) {
  // CODI USUARI
  var codiUsuariActual = document.getElementById("codiusuari").value;
  // CONTENIDOR
  var msg = document.getElementById('missatges');

  // FILA

  var fila = document.createElement("li");
  fila.setAttribute('class', 'list-group-item');
  if (codiusuari == codiUsuariActual) {
    fila.setAttribute('style', 'background-color:#ccffff');
  } else {
    fila.setAttribute('style', 'background-color:#ccffcc');
  }

  // INFO MISSATGE

  var span = document.createElement("p");
  span.setAttribute('style', 'font-size:14px; font-weight: bold;');
  span.innerHTML = formataData(datahora) + ' ' + nom;
  fila.appendChild(span);

  // foto
  /*
  if (json[i].foto!=''){
   var img=document.createElement("img");
   img.setAttribute('height','50');
   img.setAttribute('class','rounded-circle z-depth-2');
   img.setAttribute('src',json[i].foto);
   img.setAttribute('data-holder-rendered',true);
   fila.appendChild(img);
  }*/

  // CONTINGUT DEL MISSATGE

  var p = document.createElement("p");
  p.setAttribute('style', 'font-size:18px');
  p.setAttribute('id', 'missatge' + codimissatge);
  p.innerHTML = missatge;
  fila.appendChild(p);

  // SPEECH AUDIO

  var buttonVolumeUp = document.createElement("button");
  buttonVolumeUp.setAttribute("type", "button");
  buttonVolumeUp.setAttribute("class", "btn btn-warning float-right border border-dark");
  buttonVolumeUp.setAttribute('id', 'audiomissatge-' + codimissatge);
  buttonVolumeUp.setAttribute('title', "Escucha el mensaje");
  buttonVolumeUp.setAttribute('aria-label', "Escucha el mensaje");
  buttonVolumeUp.classList.add('red-focus-within');

  var volumeUp = document.createElement("i");
  volumeUp.setAttribute('class', 'fa fa-volume-up');
  volumeUp.setAttribute('aria-hidden', 'true');

  buttonVolumeUp.appendChild(volumeUp);
  fila.appendChild(buttonVolumeUp);

  // SPEECH AUDIO EVENT LISTENER

  buttonVolumeUp.addEventListener("click", function () {
    let boto = this.id;
    var idBoto = boto.split("-")[1];
    let missatge = document.getElementById('missatge' + idBoto).textContent;
    speakMessage(missatge);
  });

  buttonVolumeUp.addEventListener("focus", function () {
    speak("Escucha el mensaje");
  });

  // AFEGIR FILA AL CONTENIDOR
  msg.appendChild(fila);
}

function creaBlocMissatge2(datahora, codiusuari, nom, codimissatge, missatge) {
  // CODI USUARI
  var codiUsuariActual = document.getElementById("codiusuari").value;
  // CONTENIDOR
  var msg = document.getElementById('missatges');

  // FILA

  var fila = document.createElement("li");
  fila.setAttribute('class', 'list-group-item');
  if (codiusuari == codiUsuariActual) {
    fila.setAttribute('style', 'background-color:#ccffff');
  } else {
    fila.setAttribute('style', 'background-color:#ccffcc');
  }

  // INFO MISSATGE

  var span = document.createElement("p");
  span.setAttribute('style', 'font-size:14px; font-weight: bold;');
  span.innerHTML = formataData(datahora) + ' ' + nom;
  fila.appendChild(span);

  // foto
  /*
  if (json[i].foto!=''){
   var img=document.createElement("img");
   img.setAttribute('height','50');
   img.setAttribute('class','rounded-circle z-depth-2');
   img.setAttribute('src',json[i].foto);
   img.setAttribute('data-holder-rendered',true);
   fila.appendChild(img);
  }*/

  // CONTINGUT DEL MISSATGE

  var p = document.createElement("p");
  p.setAttribute('style', 'font-size:18px');
  p.setAttribute('id', 'missatge' + codimissatge);
  p.innerHTML = missatge;
  fila.appendChild(p);

  // SPEECH AUDIO

  var buttonVolumeUp = document.createElement("button");
  buttonVolumeUp.setAttribute("type", "button");
  buttonVolumeUp.setAttribute("class", "btn btn-warning float-right border border-dark");
  buttonVolumeUp.setAttribute('id', 'audiomissatge-' + codimissatge);
  buttonVolumeUp.setAttribute('title', "Escucha el mensaje");
  buttonVolumeUp.setAttribute('aria-label', "Escucha el mensaje");
  buttonVolumeUp.classList.add('red-focus-within');

  var volumeUp = document.createElement("i");
  volumeUp.setAttribute('class', 'fa fa-volume-up');
  volumeUp.setAttribute('aria-hidden', 'true');

  buttonVolumeUp.appendChild(volumeUp);
  fila.appendChild(buttonVolumeUp);

  // SPEECH AUDIO EVENT LISTENER

  buttonVolumeUp.addEventListener("click", function () {
    let boto = this.id;
    var idBoto = boto.split("-")[1];
    let missatge = document.getElementById('missatge' + idBoto).textContent;
    speakMessage(missatge);
  });

  buttonVolumeUp.addEventListener("focus", function () {
    speak("Escucha el mensaje");
  });

  // AFEGIR FILA AL CONTENIDOR
  msg.insertBefore(fila, msg.childNodes[0]);
}

function enviaMissatge(rq) {
  var msg = document.getElementById('noumissatge').value;
  var codiusuari = document.getElementById('codiusuari').value;
  rq.open("POST", URL_ENVIAMISSATGE, true);
  rq.onreadystatechange = function () { enviaMissatge_mostra(rq); };
  rq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  var token = document.getElementById('token').value;
  rq.setRequestHeader('Authorization', token);
  rq.send("codiusuari=" + codiusuari + "&msg=" + msg);

}

function enviaMissatge_mostra(rq) {
  var msg = document.getElementById('noumissatge');
  if (rq.readyState == 4 && rq.status == 200) {
    var resposta = JSON.parse(rq.responseText);
    var json = resposta.dades;
    let datahora = json[0].datahora;
    let codiusuari = json[0].codiusuari;
    let nom = json[0].nom;
    let codimissatge = json[0].codimissatge;
    let missatge = json[0].msg;
    creaBlocMissatge2(datahora, codiusuari, nom, codimissatge, missatge);
    msg.value = '';
    document.getElementById("error-message").innerHTML = '';
    document.getElementById("error-message-container").setAttribute("style", "display: none;");
    let note_message = document.getElementById("note_message");
    note_message.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i><b>Mensaje enviado.</b>';
    showIt(document.getElementById("modal"));
    speak("Mensaje enviado satisfactoriamente");
  } else if (rq.readyState == 4 && rq.status != 200) {
    msg = document.getElementById("error-message");
    msg.innerHTML = 'Error al enviar el mensaje. Inténtalo más tarde.';
    document.getElementById("error-message-container").setAttribute("style", "display: block;");
    speak(document.getElementById("error-message").textContent);
  }
}

function carregaMissatges(rq) {
  document.getElementById("missatges").innerHTML = '';
  rq.onreadystatechange = function () { mostraMissatges(rq); };
  rq.open("GET", URL_LLEGIR, true);
  var token = document.getElementById('token').value;
  rq.setRequestHeader('Authorization', token);
  rq.send(null);
}

function formataData(d) {
  var dia = d.substr(8, 2);
  var mes = d.substr(5, 2);
  var anio = d.substr(0, 4);
  var hora = d.substr(11, 2);
  var min = d.substr(14, 2);
  return dia + '-' + mes + '-' + anio + ' ' + hora + ':' + min;
}

function mostraMissatges(rq) {

  //var token = document.getElementById('token').value;
  //rq.setRequestHeader('Authorization', token);
  //rq.send(null);

  if (rq.readyState == 4 && rq.status == 200) {
    var resposta = JSON.parse(rq.responseText);
    // Sessió no iniciada
    if (!resposta.correcta) {
      let msg = document.getElementById('error-message-container');
      msg.innerHTML = '<h3><p class="bg-danger text-center">' + resposta.missatge + '</p></h3>';
      msg.setAttribute("display", "block");
    }
    else {
      document.getElementById('error-message-container').setAttribute("display", "none");
      var json = resposta.dades;
      for (i in json) {
        let datahora = json[i].datahora;
        let codiusuari = json[i].codiusuari;
        let nom = json[i].nom;
        let codimissatge = json[i].codimissatge;
        let missatge = json[i].msg;
        creaBlocMissatge(datahora, codiusuari, nom, codimissatge, missatge);
      }
      document.getElementById('noumissatge').innerHTML = '';
      ocultaSpin();
    }
  } else {
    if (rq.status != 200) {
      var msg = document.getElementById('error-message');
      msg.innerHTML = 'Error al cargar los mensajes';
      //speak(msg.textContent);
      ocultaSpin();
    }
  }
}

//////////////////////////////////   PERFIL /////////////////
function guardaperfil(rq) {
  //rq
  var formdata = new FormData();
  var email = document.getElementById('perfilemail').value;
  formdata.append('email', email);
  var nom = document.getElementById('perfilnom').value;
  formdata.append('nom', nom);
  var password = document.getElementById('perfilpsw').value;
  formdata.append('password', password);
  //var foto = document.getElementById('perfilfoto').files[0];
  //formdata.append('foto', foto);
  //objecte
  rq.onreadystatechange = function () { resultatPerfil(rq); };
  rq.open("POST", URL_PERFIL, true);
  var token = document.getElementById('token').value;
  rq.setRequestHeader('Authorization', token);
  //rq.setRequestHeader('Content-Type', 'multipart/form-data');
  rq.send(formdata);
}

function resultatPerfil(rq) {
  if (rq.readyState == 4) {
    if (rq.status == 200) {
      var rq = agafaObjecte();
      carregaXat(rq);
    } else {
      // TODO
    }
  }
}
///////////////////////////////////////////////////////////////////////////


function ocultaSpin() {
  document.getElementById('spin').setAttribute("style", "display: none");
  document.getElementById('volta').setAttribute("style", "display: none");
}

function mostraSpin() {
  document.getElementById('spin').setAttribute("style", "display: block");
  document.getElementById('volta').setAttribute("style", "display: block");
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1);
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}

function posaGalleta() {
  var nom = document.getElementById('nom').value;
  setCookie(nomgalleta, nom, 30);
  var psw = document.getElementById('psw').value;
  setCookie(pswgalleta, psw, 30);
}

function estaObertDropdown() {
  if (document.getElementById("dropdown-content").className == "has-submenu open") {
    document.getElementById("dropdown-content").querySelector('a').setAttribute('aria-expanded', "true");
    document.getElementById("dropdown-content").querySelector('button').setAttribute('aria-expanded', "true");
    document.getElementById("general").setAttribute("style", "margin-top: 6rem");
  }
}

function tancaDropdown() {
  document.getElementById("dropdown-content").className = "has-submenu";
  document.getElementById("dropdown-content").querySelector('a').setAttribute('aria-expanded', "false");
  document.getElementById("dropdown-content").querySelector('button').setAttribute('aria-expanded', "false");
  document.getElementById("general").setAttribute("style", "margin-top: 0rem");
}

function carregaOnClickElements() {
  document.getElementById('btperfil').addEventListener("click", function () {
    editaperfil();
  });

  document.getElementById('btchat').addEventListener("click", function () {
    var rq = agafaObjecte();
    carregaXat(rq);
  });

  document.getElementById('btperfilcancela').addEventListener("click", function () {
    var rq = agafaObjecte();
    carregaXat(rq);
  });

  document.getElementById('btperfilguarda').addEventListener("click", function () {
    var rq = agafaObjecte();
    guardaperfil(rq);
  });

  document.getElementById('btlogin').addEventListener("click", function () {
    var rq = agafaObjecte();
    validaLogin(rq);
  });

  document.getElementById('register').addEventListener("click", function () {
    registreUsuari();
  });


  document.getElementById("btRegistre").addEventListener("click", function () {
    var rq = agafaObjecte();
    afegeixUsuari(rq);
  });

  document.getElementById("signin").addEventListener("click", function () {
    carregaInici();
  });
}

function carregaOnFocusElements() {

  ////////////////// SIGN IN ////////////////////

  // NAME
  document.getElementById("nom").addEventListener("focus", function () {
    speak("Por favor, escribe tu email");
  });

  // PASSWORD
  document.getElementById("psw").addEventListener("focus", function () {
    speak("Por favor, escribe tu contraseña");
  });

  // LOGIN BUTTON
  document.getElementById("btlogin").addEventListener("focus", function () {
    speak("Inicia sesión");
  });

  // SIGN IN BUTTON
  document.getElementById("register").addEventListener("focus", function () {
    speak("¿No tienes una cuenta? Regístrate aquí.")
  });

  ///////////////// SIGN UP ////////////////////

  // USERNAME

  document.getElementById("nom-registre").addEventListener("focus", function () {
    speak("Por favor, escribe un nombre");
  });

  // EMAIL

  document.getElementById("email-registre").addEventListener("focus", function () {
    speak("Por favor, escribe un email");
  });

  // PASSWORD

  document.getElementById("psw-registre").addEventListener("focus", function () {
    speak("Por favor, escribe una contraseña");
  });

  // REPEAT PASSWORD

  document.getElementById("psw-registre2").addEventListener("focus", function () {
    speak("Por favor, repite la contraseña");
  });

  // REGISTER. SIGN UP

  document.getElementById("btRegistre").addEventListener("focus", function () {
    if (isEmptyOrSpaces(document.getElementById("nom-registre").value) || isEmptyOrSpaces(document.getElementById("email-registre").value)) {
      speak("¿Quieres registrarte? No puedes, porque el usuario o el email son incorrectos.");
    } else {
      speak("¿Quieres registrarte? Tu nombre de usuario será " + document.getElementById("nom-registre").value + " y tu email será " + document.getElementById("email-registre").value);
    }
  });

  // ALREADY HAVE ACCOUNT? SIGN IN

  document.getElementById("signin").addEventListener("focus", function () {
    speak("¿Ya tienes una cuenta? Inicia la sesión aquí.");
  });

  ////////////////// CHAT ///////////////////////

  // MESSAGE
  document.getElementById("noumissatge").addEventListener("focus", function () {
    speak("Por favor, escribe un mensaje");
  });

  // + 
  document.getElementById("btnoumsg").addEventListener("focus", function () {
    if (isEmptyOrSpaces(document.getElementById("noumissatge").value)) {
      speak("¿Quieres enviar el mensaje? No puedes, porque no puede estar en blanco.");
    } else {
      speak("¿Quieres enviar el mensaje? El mensaje es " + document.getElementById("noumissatge").value);
    }
  });

  // VOICE
  document.getElementById("voiceOptions").addEventListener("focus", function () {
    speak("Elige la voz para reproducir los audios del chat");
  });

  // MENU
  document.getElementById("btperfil").addEventListener("focus", function () {
    speak("Muestra las opciones de tu perfil");
  });

  document.getElementById("btchat").addEventListener("focus", function () {
    speak("Muestra el menú del chat");
  });

  document.getElementById("btgraphic").addEventListener("focus", function () {
    speak("Muestra un gráfico estadístico");
  });

  document.getElementById("logout").addEventListener("focus", function () {
    speak("Salir");
  });

  ////////////////// PROFILE ///////////////////////

  //NAME

  document.getElementById("perfilnom").addEventListener("focus", function () {
    speak("Cambia tu nombre de perfil. Tu nombre de perfil ahora es " + document.getElementById("perfilnom").value);
  });  
  
  //EMAIL

  document.getElementById("perfilemail").addEventListener("focus", function () {
    speak("Cambia tu email de perfil. Tu nombre de email ahora es " + document.getElementById("perfilemail").value);
  }); 

  // PASSWORD

  document.getElementById("perfilpsw").addEventListener("focus", function(){
    speak("Pon una nueva contraseña.");
  });

  // CANCEL

  document.getElementById("btperfilcancela").addEventListener("focus", function(){
    speak("Cancela tus cambios.");
  });

  document.getElementById("btperfilguarda").addEventListener("focus", function(){
   if (isEmptyOrSpaces(document.getElementById("perfilnom").value) || isEmptyOrSpaces(document.getElementById("perfilemail").value)) {
      speak("¿Quieres guardar tus cambios? No puedes, porque el nuevo usuario o email están vacíos.");
    } else {
      speak("¿Quieres guardar tus cambios? Tu nuevo nombre de usuario será " + document.getElementById("perfilnom").value + " y tu email será " + document.getElementById("perfilemail").value);
    }
  });

  // LANGUAGE SELECTION
  
  document.getElementById("language-selection").addEventListener("focus", function(){
    speak("Cambia el idioma a inglés");
  });

}