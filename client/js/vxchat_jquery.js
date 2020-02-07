// TO JQUERY! ↓
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
//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

$(document).ready(function () {
    carregaInici();
});

function carregaInici() {
    $("#pswdiv").fadeIn();
    $("#pswregistre").hide();
    $("#chatdiv").css("display", "none !important");
    $("#logindiv").css("display", "none !important");
    $('#message-container').hide();
    $("#perfildiv").hide();
    $("#errorlogindiv").hide();
    $("#graphicdiv").hide();

    $("#nom").val() = getCookie(nomgalleta);
    $("#psw").val() = getCookie(pswgalleta);

    carregaOnFocusElements();
    carregaOnClickElements();

    $("#nom").change(function () {
        posaGalleta();
    });

    $(responsiveVoice).speak("You are in the sign in section");
}

function registreUsuari() {
    $(responsiveVoice).speak("You are in the sign up section");

    $("#pswregistre").fadeIn();
    $("#pswdiv").hide();
    $('#message-container').hide();
    $("#chatdiv").css("display", "none !important");
    $("#logindiv").css("display", "none !important");
    $("#errorUsuariRegistreDiv").hide();
    $("#errorUsuariRegistreDiv2").hide();
    $("#errorContrasenyaRegistreDiv").hide();
    $("#perfildiv").hide();
    $("#errorlogindiv").hide();
}

function afegeixUsuari(rq) {
    // PASSWORDS ARE NOT EQUAL 

    if ($("#psw-registre").val() != $("#psw-registre2").val()) {
        $("#errorContrasenyaRegistreDiv").show();
        $(responsiveVoice).speak($("#errorContrasenyaRegistreDiv").text());
    } else {
        $("#errorContrasenyaRegistreDiv").hide();
    }

    // NAME OR EMAIL EMPTY

    if (isEmptyOrSpaces($('#nom-registre').val()) || isEmptyOrSpaces($("#email-registre").val())) {
        $("#errorUsuariRegistreDiv").show();
        $(responsiveVoice).speak($("#errorContrasenyaRegistreDiv").text());
    } else {
        $("#errorUsuariRegistreDiv").hide();
    }

    // PASSWORDS ARE EQUAL, NAME AND EMAIL ARE NOT EMPTY

    if ($("#psw-registre").val() == $("#psw-registre2").val() && !isEmptyOrSpaces($('#nom-registre').val() && !isEmptyOrSpaces($("#email-registre").val()) {
        // REGISTER USER
        $.ajax({
            url: URL_LOGIN,
            type: 'POST',
            dataType: 'json',
            data: {
                nom: $("#nom-registre").val(),
                email: $("#email-registre").val(),
                password: $("#psw-registre").val()
            },
            success: function (resposta) {
                if (resposta.correcta == false) {
                    $("#errorUsuariRegistre2").show();
                    $(responsiveVoice).speak($("#errorUsuariRegistre2").text());
                } else {
                    $("#note_message").html('<i class="fas fa-check" aria-hidden="true"></i><b>User has been created.</b>');
                    $("#modal").show();
                    $("#nom-registre").html("");
                    $("#email-registre").html("");
                    $("#psw-registre").html("");
                    $("#psw-registre2").html("");
                    carregaInici();
                }
            },
            error: function () {
                alert("Unexpected error on registering user");
            }
        });
    }
}

function editaperfil() {
    $(responsiveVoice).speak("You are in the profile section");
    $("#perfildiv").show();
    $("#pswdiv").hide();
    $("#chatdiv").css("display", "none !important");
    $("#message-container").hide();
    $("#graphicdiv").hide();
    $("#perfilnom").val() = $("#nom_usuari").val();
    $("#perfilemail").val() = $("#email_usuari").val();
}

function carregaOnFocusElements() {

    ////////////////// SIGN IN ////////////////////

    // NAME
    $("#nom").focus(function () {
        $(responsiveVoice).speak("Please write your email");
    });

    // PASSWORD
    $("#psw").focus(function () {
        $(responsiveVoice).speak("Please write your password");
    });

    // LOGIN BUTTON
    $("#btlogin").focus(function () {
        $(responsiveVoice).speak("Log In");
    });

    // SIGN IN BUTTON
    $("#register").focus(function () {
        $(responsiveVoice).speak("Don't have an account? Sign up here.")
    });

    ///////////////// SIGN UP ////////////////////

    // USERNAME

    $("#nom-registre").focus(function () {
        $(responsiveVoice).speak("Please type a username");
    });

    // EMAIL

    $("#email-registre").focus(function () {
        $(responsiveVoice).speak("Please type an email");
    });

    // PASSWORD

    $("#psw-registre").focus(function () {
        $(responsiveVoice).speak("Please type a password");
    });

    // REPEAT PASSWORD

    $("#psw-registre2").focus(function () {
        $(responsiveVoice).speak("Please repeat the password");
    });

    // REGISTER. SIGN UP

    $("#btRegistre").focus(function () {
        if (isEmptyOrSpaces($("#nom-registre").val()) || isEmptyOrSpaces($("#email-registre").val())) {
            $(responsiveVoice).speak("Do you want to register? You can't, because username or email is blank.");
        } else {
            $(responsiveVoice).speak("Do you want to register? Your username will be " +
                $("#nom-registre").val() + " and your email will be " + $("#email-registre").val());
        }
    });

    // ALREADY HAVE ACCOUNT? SIGN IN

    $("#signin").focus(function () {
        $(responsiveVoice).speak("Do you already have an account? Please sign in here.");
    });

    ////////////////// CHAT ///////////////////////

    // MESSAGE
    $("#noumissatge").focus(function () {
        $(responsiveVoice).speak("Please type a message");
    });

    // + 
    $("#btnoumsg").focus(function () {
        if (isEmptyOrSpaces($("noumissatge").value)) {
            $(responsiveVoice).speak("Do you want to send message? You can't, because it can not be blank");
        } else {
            $(responsiveVoice).speak("Do you want to send message? The message is " + $("#noumissatge").val());
        }
    });

    // VOICE
    $("#voiceOptions").focus(function () {
        $(responsiveVoice).speak("Select default voice for playing chat audios");
    });

    // MENU
    $("#btperfil").focus(function () {
        $(responsiveVoice).speak("Display your profile settings");
    });

    $("#btchat").focus(function () {
        $(responsiveVoice).speak("Display your chat menu");
    });

    $("#btgraphic").focus(function () {
        $(responsiveVoice).speak("Display an statistical graphic");
    });

    $("#logout").focus(function () {
        $(responsiveVoice).speak("Log out");
    });
}

function carregaOnClickElements() {

    $('#btperfil').click(function () {
        editaperfil();
    });

    $('#btchat').click(function () {
        var rq = agafaObjecte();
        carregaXat($(rq));
    });

    $('#btperfilcancela').click(function () {
        var rq = agafaObjecte();
        carregaXat($(rq));
    });

    $('#btperfilguarda').click(function () {
        var rq = agafaObjecte();
        guardaperfil($(rq));
    });

    $('#btlogin').click(function () {
        var rq = agafaObjecte();
        validaLogin($(rq));
    });

    $('#register').click(function () {
        registreUsuari();
    });

    $("#btRegistre").click(function () {
        var rq = agafaObjecte();
        afegeixUsuari($(rq));
    });

    $("#signin").click(function () {
        carregaInici();
    });
}

// CHANGE THIS TO JQUERY! ↓

function agafaObjecte() {
    if (window.XMLHttpRequest) {
        return (new XMLHttpRequest());
    } else {
        if (window.ActiveXObject) {
            return (new ActiveXObject("Microsoft.XMLHTTP"));
        } else { return (null); }
    }
}

//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// CHANGE THIS TO JQUERY! ↓

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// CHANGE THIS TO JQUERY! ↓

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

//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

function posaGalleta() {
    $('#nom').val().setCookie(nomgalleta, $("#nom"), 30);
    $('#psw').val().setCookie(pswgalleta, $("#psw"), 30);
}

// CHANGE THIS TO JQUERY! ↓

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

//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

// FUNCTIONS

function isEmptyOrSpaces(str) {
    let regex = new RegExp(/^ *$/);
    return $(str) === null || $(regex).match($(str)) !== null;
}