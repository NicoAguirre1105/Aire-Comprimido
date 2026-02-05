
function menuEffect() {
    if (menuCounter == true) {
        menu.className = "menu-hidden"
        menuCounter = false
        body.className = ""
        return
    }
    menu.className = "menu-visible"
    menuCounter = true
    body.className = "no-scroll"
}

function resizeWindow() {
    if (window.innerWidth >= 1024) {
        menu.className = "menu-desktop"
        nav.className = "nav-desktop"
        aboutUs.className = "aboutUs-desktop"
        logoBackground.className = "fixed-background-desktop"
        services.className = "services-desktop"
        return
    }
    menu.className = ""
    nav.className = ""
    aboutUs.className = "aboutUs"
    logoBackground.className = "fixed-background"
    services.className = "services"
}

function createContactWindow() {
    contactWindow.className = "contactWindow-visible"
    if (window.innerWidth < 1024) {
        body.className = "no-scroll"
    }
    if (menuCounter == true) {
        menu.className = "menu-hidden"
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
    aboutUs = document.getElementById("aboutUs"),
    logoBackground = document.getElementById("logoBackground"),
    contactButton_nav = document.getElementById("contact-nav"),
    contactButton_header = document.getElementById("header-button"),
    contactButton_contactUs = document.getElementById("contactUs-button"),
    contactWindow = document.getElementById("contactWindow"),
    xmark = document.getElementById("xmark"),
    body = document.getElementById("body"),
    services = document.getElementById('services')
let menuCounter = false

resizeWindow()
menu_icon.addEventListener("click", menuEffect)
window.addEventListener("resize", resizeWindow)
contactButton_nav.addEventListener('click', createContactWindow)
contactButton_header.addEventListener('click', createContactWindow)
contactButton_contactUs.addEventListener('click', createContactWindow)
xmark.addEventListener('click', closeContactWindow)

