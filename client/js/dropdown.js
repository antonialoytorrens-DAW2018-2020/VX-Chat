function carregaDropdown() {
    var menuItems = document.querySelectorAll('li.has-submenu');
    var button_dropdown = document.getElementById("button-dropdown");

    if (button_dropdown != null) {
        button_dropdown.parentNode.removeChild(button_dropdown);
    }

    Array.prototype.forEach.call(menuItems, function (el, i) {
        var activatingA = el.querySelector('a');
        var btn = '<button id="button-dropdown" title="Open submenu" tabindex="1"><i class="fas fa-bars" aria-hidden="true"></i></button>';
        activatingA.insertAdjacentHTML('afterend', btn);

        el.querySelector('button').addEventListener("click", function (event) {
            if (this.parentNode.className == "has-submenu") {
                this.parentNode.className = "has-submenu open";
                this.parentNode.querySelector('a').setAttribute('aria-expanded', "true");
                this.parentNode.querySelector('button').setAttribute('aria-expanded', "true");
                responsiveVoice.speak("Submenu opened, there are four sections: Profile Settings, Chat Menu, View Statistical Graphic and Logout.");
                document.getElementById("general").setAttribute("style", "margin-top: 6rem");
            } else {
                this.parentNode.className = "has-submenu";
                this.parentNode.querySelector('a').setAttribute('aria-expanded', "false");
                this.parentNode.querySelector('button').setAttribute('aria-expanded', "false");
                responsiveVoice.speak("Submenu closed");
                document.getElementById("general").setAttribute("style", "margin-top: 0rem");
            }

            /*if(this.parentNode.target.id != "dropdown-content") {
                this.parentNode.querySelector('a').setAttribute('aria-expanded', "false");
                this.parentNode.querySelector('button').setAttribute('aria-expanded', "false");
            }*/

            event.preventDefault();
        });
    });
    document.getElementById("button-dropdown").addEventListener("focus", function () {
        responsiveVoice.speak("Open submenu");
    });
}