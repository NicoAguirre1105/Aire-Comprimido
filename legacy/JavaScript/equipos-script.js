
class PageSelector {
    constructor(page, index) {
        this.page = page
        this.index = index + 1
        this.createClass()
    }

    createClass() {
        if (this.index == 1) {
            this.class = "selected"
            return
        }
        this.class = "not-selected"
    }

    createSelector() {
        let text = ""
        return text.concat("<div class = 'hyper ", this.class, "' id='", this.index.toString(), "'>", this.index.toString(), "</div>")
    }

    createEvent(pagePassed) {
        let selector = document.getElementById(this.index.toString())
        selector.addEventListener('click', function() { changePage(pagePassed, selector) })
    }
}



function menuEffect() {
    if (menuCounter == true) {
        menu.className = "menu-hidden"
        body.className = ''
        menuCounter = false
        return
    }
    menu.className = "menu-visible"
    body.className = 'no-scroll'
    menuCounter = true
}

function resizeWindow() {
    if (window.innerWidth >= 1024) {
        menu.className = "menu-desktop"
        nav.className = "nav-desktop"
        productsContainer.className = 'product-container-landscape'
        return
    }

    if (window.innerWidth >= 560) {
        productsContainer.className = 'product-container-landscape'
        menu.className = ""
        nav.className = ""
        return
    }

    menu.className = ""
    nav.className = ""
    productsContainer.className = 'product-container'
}


function main(jsonData) {
    resizeWindow()
    let pagesContent = separatePages(jsonData), 
        pageButtons = [],
        i = 1
    for (i; i < pagesContent.length; i++ ) {
        pageButtons.push(new PageSelector(pagesContent[i], i))
    }

    if (i != 1) {
        showProducts(pageButtons[0].page)
        createNav(pageButtons)
        createEvents(pageButtons)
        return
    }
    
    showProducts(pagesContent[0])
}

function separatePages(jsonData) {
    let pages = []
    while (jsonData.length > 10) {
        pages.push(jsonData.splice(0, 10))
    }
    pages.push(jsonData)
    return pages
}

function createNav(pageButtons) {
    let text = ""
    pageButtons.forEach(button => {
        text = text.concat(button.createSelector())
    });
    pagesNav.innerHTML = text
}

function createEvents(pageButtons) {
    pageButtons.forEach(button => {
        button.createEvent(button.page)
    });
}

function showProducts(products) {
    let text = ""
    
    products.forEach(prod => {
        let itemText = "<section class='product'><img src='" + prod.photo + "' alt='" + prod.name + "'><div class='text'><h2>" + prod.name + "</h2>"
        prod.specifications.forEach(line => {
            itemText = itemText.concat("<p>" + line + "</p>")
        });
        text = text.concat(itemText + "</div></section>")
    });
    productsContainer.innerHTML = text
}

function changePage(page, selector) {
    let button = document.getElementsByClassName('selected')
    
    showProducts(page)
    button[0].className = 'hyper not-selected'
    selector.className = 'hyper selected'
    
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
    pagesNav = document.getElementById("pagesNav"),
    productsContainer = document.getElementById("products-container"),
    contactButton_nav = document.getElementById("contact-nav"),
    contactButton = document.getElementById("contact-button"),
    contactWindow = document.getElementById("contactWindow"),
    xmark = document.getElementById("xmark"),
    body = document.getElementById('body')

let menuCounter = false

menu_icon.addEventListener("click", menuEffect)
window.addEventListener("resize", resizeWindow)
contactButton_nav.addEventListener('click', createContactWindow)
contactButton.addEventListener('click', createContactWindow)
xmark.addEventListener('click', closeContactWindow)


resizeWindow()
fetch("Json/equipos.json")
    .then(response => response.json())
    .then(json => {
        main(json)
    })
    