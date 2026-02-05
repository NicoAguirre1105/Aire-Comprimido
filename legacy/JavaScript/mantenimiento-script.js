function menuEffect() {
    if (menuCounter == true) {
        menu.className = "menu menu-hidden"
        body.className = ''
        menuCounter = false
        return
    }
    menu.className = "menu menu-visible"
    body.className = 'no-scroll'
    menuCounter = true
}

function resizeWindow() {
    if (window.innerWidth >= 1024) {
        menu.className = "menu-desktop"
        nav.className = "nav-desktop"
        return
    }

    if (window.innerWidth >= 560) {
        menu.className = "menu menu-hidden"
        nav.className = ""
        return
    }

    menu.className = "menu"
    nav.className = ""
}


function createContactWindow() {
    contactWindow.className = "contactWindow-visible"
    if (window.innerWidth < 1024) {
        body.className = "no-scroll"
    }
    if (menuCounter == true) {
        menu.className = "menu menu-hidden"
        menuCounter = false
    }
}

function closeContactWindow() {
    contactWindow.className = "contactWindow-hidden"
    body.className = ""
}

const menu_icon = document.getElementById("menu_Icon"),
    menu = document.getElementById("menu"),
    nav = document.getElementById("nav"),
    contactButton_nav = document.getElementById("contact-nav"),
    contactButton = document.getElementById("contact-button"),
    contactWindow = document.getElementById("contactWindow"),
    xmark = document.getElementById("xmark"),
    body = document.getElementById('body')

let menuCounter = false

resizeWindow()
menu_icon.addEventListener("click", menuEffect)
window.addEventListener("resize", resizeWindow)
contactButton_nav.addEventListener('click', createContactWindow)
contactButton.addEventListener('click', createContactWindow)
xmark.addEventListener('click', closeContactWindow)    