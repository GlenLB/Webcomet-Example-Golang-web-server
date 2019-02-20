// MENU

let menu = document.getElementById("menu");
let nav = document.getElementById("nav-link");
let menuActive = false;

menu.addEventListener('click', function (e) {
    if (!menuActive) {
        menu.children[0].style.position = "relative";
        menu.children[0].style.transform = "rotate(405deg)";
        menu.children[0].style.top = "12px";
        menu.children[1].style.opacity = "0";
        menu.children[2].style.position = "relative";
        menu.children[2].style.transform = "rotate(-405deg)";
        menu.children[2].style.bottom = "12px";
        menuActive = true;
        nav.classList.remove("invisible");
        nav.classList.add("visible");
    } else {
        menu.children[0].style.transform = "rotate(0deg)";
        menu.children[0].style.top = "0px";
        menu.children[1].style.opacity = "1";
        menu.children[2].style.transform = "rotate(0deg)";
        menu.children[2].style.bottom = "0px";
        menuActive = false;
        nav.classList.remove("visible");
        nav.classList.add("invisible");
    }
    e.stopPropagation();
});




let btnContact = document.getElementById('btnContact');
let contactBox = document.getElementsByClassName("contact_box")[0];

btnContact.onclick = function (e) {
    let val = contactBox.getBoundingClientRect().top;
    let i = 0;
    let y = setInterval(function () {
        if (i < val) {
            window.scrollTo(window.scrollX, i);
            i += 40;
        } else {
            clearInterval(y);
        }
    }, 10);
    e.stopPropagation();
}