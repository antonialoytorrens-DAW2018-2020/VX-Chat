var menuItems = document.querySelectorAll('li.has-submenu');
Array.prototype.forEach.call(menuItems, function (el, i) {
    var activatingA = el.querySelector('a');
    var btn = '<button tabindex="1"></button>';
    activatingA.insertAdjacentHTML('afterend', btn);

    el.querySelector('button').addEventListener("click", function (event) {
        if (this.parentNode.className == "has-submenu") {
            this.parentNode.className = "has-submenu open";
            this.parentNode.querySelector('a').setAttribute('aria-expanded', "true");
            this.parentNode.querySelector('button').setAttribute('aria-expanded', "true");
        } else {
            this.parentNode.className = "has-submenu";
            this.parentNode.querySelector('a').setAttribute('aria-expanded', "false");
            this.parentNode.querySelector('button').setAttribute('aria-expanded', "false");
        }
        event.preventDefault();
    });
});