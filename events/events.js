const colormodeButton = document.querySelector("#color-mode");
const colormodeButtonIcon = document.querySelector("#color-mode-icon");
const navbarEl = document.querySelector("#navbar");
const footerEl = document.querySelector("#footer");
const loginEl = document.querySelector("#login");
const accountEl = document.querySelector('#account');
const eventsDiv = document.querySelector("#event-div");




//switches color mode between light and dark
function switchColorMode() {
    const currentColorMode = localStorage.getItem("colorMode");
    if (currentColorMode === "dark") {
        localStorage.setItem("colorMode", "light");
        console.log("ColorMode: " + "Light");
    } else {
        localStorage.setItem("colorMode", "dark");
        console.log("ColorMode: " + "Dark");
    }
    setColorMode();
}

//sets color mode based on local storage
function setColorMode() {
    const currentColorMode = localStorage.getItem("colorMode");
    if (currentColorMode === "dark") {
        //change body theme to dark
        document.body.setAttribute("data-bs-theme", "dark");
        //change background pattern to dark
        document.body.classList.remove("bg-pattern-light");
        document.body.classList.add("bg-pattern-dark");
        //change icon to moon
        colormodeButtonIcon.classList.remove("bi-sun-fill");
        colormodeButtonIcon.classList.add("bi-moon-stars-fill");
        //change button color to dark
        colormodeButton.classList.remove("bg-dark", "text-light");
        colormodeButton.classList.add("bg-light", "text-dark");
        //change navbar color to dark
        navbarEl.classList.remove("bg-light", "text-dark");
        navbarEl.classList.add("bg-dark", "text-light");
        //change footer color to dark
        footerEl.classList.remove("bg-light", "text-dark");
        footerEl.classList.add("bg-dark", "text-light");
        //change login color to dark
        loginEl.classList.remove("bg-dark", "text-light");
        loginEl.classList.add("bg-light", "text-dark");
        //change account color to dark
        accountEl.classList.remove("bg-dark", "text-light");
        accountEl.classList.add("bg-light", "text-dark");
    } else {
        //change body theme to light
        document.body.setAttribute("data-bs-theme", "light");
        //change background pattern to light
        document.body.classList.remove("bg-pattern-dark");
        document.body.classList.add("bg-pattern-light");
        //change icon to sun
        colormodeButtonIcon.classList.remove("bi-moon-stars-fill");
        colormodeButtonIcon.classList.add("bi-sun-fill");
        //change button color to light
        colormodeButton.classList.remove("bg-light", "text-dark");
        colormodeButton.classList.add("bg-dark", "text-light");
        //change navbar color to light
        navbarEl.classList.remove("bg-dark", "text-light");
        navbarEl.classList.add("bg-light", "text-dark");
        //change footer color to light
        footerEl.classList.remove("bg-dark", "text-light");
        footerEl.classList.add("bg-light", "text-dark");
        //change login color to light
        loginEl.classList.remove("bg-light", "text-dark");
        loginEl.classList.add("bg-dark", "text-light");
        //change account color to light
        accountEl.classList.remove("bg-light", "text-dark");
        accountEl.classList.add("bg-dark", "text-light");

    }
}

function setLoginButton() {
    if (localStorage.getItem('email') !== null) {
        loginEl.innerHTML = "Logout";
    } else {
        loginEl.innerHTML = "Login";
    }
}

function logout() {
    localStorage.removeItem('email');
    setLoginButton();
}

function loginHandler() {
    if (localStorage.getItem('email') !== null) {
        logout();
    } else {
        window.location.href = "../login/login.html";
    }

}

function accountHandler() {
    if (localStorage.getItem('email') !== null) {
        window.location.href = "./userPage/user.html";
    } else {
        window.location.href = "./login/login.html";
    }
}

function renderCards() {
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).includes('card')) {
            let card = JSON.parse(localStorage.getItem(localStorage.key(i)));
            console.log(card);
            let cardDiv = document.createElement("div");
            cardDiv.classList.add("card", "m-3", "p-4", "card-event", "col-5");

            let cardTitle = document.createElement("h5");
            cardTitle.textContent = card['title'] + " ";
            cardTitle.classList.add("card-title", "border-3", "border-purple", "pb-2");


            let cardDate = document.createElement("p");
            cardDate.textContent = "Date: " + card['date'];
            cardDate.classList.add("card-text");


            let cardDescription = document.createElement("p");
            cardDescription.textContent = "Description: " + card['description'];
            cardDescription.classList.add("card-text");
            if (cardDescription.textContent.includes("elderly") || cardDescription.textContent.includes("Elderly")) {
                let tag = document.createElement("i");
                tag.classList.add("bi", "bi-person-wheelchair", "bg-primary", "pe-1", "ps-1", "rounded", "text-white", "me-1");
                tag.setAttribute("data-toggle", "tooltip");
                tag.setAttribute("title", "Elderly");
                cardTitle.appendChild(tag);
            }
            if (cardDescription.textContent.includes("children") || cardDescription.textContent.includes("Children")) {
                let tag = document.createElement("i");
                tag.classList.add("bi", "bi-emoji-smile", "bg-warning", "pe-1", "ps-1", "rounded", "text-white", "me-1");
                tag.setAttribute("data-toggle", "tooltip");
                tag.setAttribute("title", "Children");
                cardTitle.appendChild(tag);
            }
            if (cardDescription.textContent.includes("food") || cardDescription.textContent.includes("Food")) {
                let tag = document.createElement("i");
                tag.classList.add("bi", "bi-basket2-fill", "bg-success", "pe-1", "ps-1", "rounded", "text-white", "me-1");
                tag.setAttribute("data-toggle", "tooltip");
                tag.setAttribute("title", "Food");
                cardTitle.appendChild(tag);
            }
            if (cardDescription.textContent.includes("shelter") || cardDescription.textContent.includes("Shelter")) {
                let tag = document.createElement("i");
                tag.classList.add("bi", "bi-house-fill", "bg-danger", "pe-1", "ps-1", "rounded", "text-white", "me-1");
                tag.setAttribute("data-toggle", "tooltip");
                tag.setAttribute("title", "Shelter");
                cardTitle.appendChild(tag);
            }
            if (cardDescription.textContent.includes("medical") || cardDescription.textContent.includes("Medical")) {
                let tag = document.createElement("i");
                tag.classList.add("bi", "bi-heart-fill", "bg-danger", "pe-1", "ps-1", "rounded", "text-white", "me-1");
                tag.setAttribute("data-toggle", "tooltip");
                tag.setAttribute("title", "Medical");
                cardTitle.appendChild(tag);
            }
            if (cardDescription.textContent.includes("volunteer") || cardDescription.textContent.includes("Volunteer")) {
                let tag = document.createElement("i");
                tag.classList.add("bi", "bi-people-fill", "bg-secondary", "pe-1", "ps-1", "rounded", "text-white", "me-1");
                tag.setAttribute("data-toggle", "tooltip");
                tag.setAttribute("title", "Volunteer");
                cardTitle.appendChild(tag);
            }
            if (cardDescription.textContent.includes("donation") || cardDescription.textContent.includes("Donation")) {
                let tag = document.createElement("i");
                tag.classList.add("bi", "bi-currency-dollar", "bg-warning", "pe-1", "ps-1", "rounded", "text-white", "me-1");
                tag.setAttribute("data-toggle", "tooltip");
                tag.setAttribute("title", "Donation");
                cardTitle.appendChild(tag);
            }
            if (cardDescription.textContent.includes("fundraiser") || cardDescription.textContent.includes("Fundraiser")) {
                let tag = document.createElement("i");
                tag.classList.add("bi", "bi-cash-stack", "bg-success", "pe-1", "ps-1", "rounded", "text-white", "me-1");
                tag.setAttribute("data-toggle", "tooltip");
                tag.setAttribute("title", "Fundraiser");
                cardTitle.appendChild(tag);
            }
            if (cardDescription.textContent.includes("event") || cardDescription.textContent.includes("Event")) {
                let tag = document.createElement("i");
                tag.classList.add("bi", "bi-calendar-event", "bg-info", "pe-1", "ps-1", "rounded", "text-white", "me-1");
                tag.setAttribute("data-toggle", "tooltip");
                tag.setAttribute("title", "Event");
                cardTitle.appendChild(tag);
            }
            if (cardDescription.textContent.includes("animal") || cardDescription.textContent.includes("Animal")) {
                let tag = document.createElement("i");
                tag.classList.add("bi", "bi-emoji-heart-eyes", "bg-warning", "pe-1", "ps-1", "rounded", "text-white", "me-1");
                tag.setAttribute("data-toggle", "tooltip");
                tag.setAttribute("title", "Animal");
                cardTitle.appendChild(tag);
            }
            if (cardDescription.textContent.includes("environment") || cardDescription.textContent.includes("Environment")) {
                let tag = document.createElement("i");
                tag.classList.add("bi", "bi-tree", "bg-success", "pe-1", "ps-1", "rounded", "text-white", "me-1");
                tag.setAttribute("data-toggle", "tooltip");
                tag.setAttribute("title", "Environment");
                cardTitle.appendChild(tag);
            }
            if (cardDescription.textContent.includes("education") || cardDescription.textContent.includes("Education")) {
                let tag = document.createElement("i");
                tag.classList.add("bi", "bi-book", "bg-info", "pe-1", "ps-1", "rounded", "text-white", "me-1");
                tag.setAttribute("data-toggle", "tooltip");
                tag.setAttribute("title", "Education");
                cardTitle.appendChild(tag);
            }
            if (cardDescription.textContent.includes("health") || cardDescription.textContent.includes("Health")) {
                let tag = document.createElement("i");
                tag.classList.add("bi", "bi-heart-half", "bg-danger", "pe-1", "ps-1", "rounded", "text-white", "me-1");
                tag.setAttribute("data-toggle", "tooltip");
                tag.setAttribute("title", "Health");
                cardTitle.appendChild(tag);
            }
            if (cardDescription.textContent.includes("sports") || cardDescription.textContent.includes("Sports") || cardDescription.textContent.includes("games") || cardDescription.textContent.includes("Games")) {
                let tag = document.createElement("i");
                tag.classList.add("bi", "bi-dribbble", "bg-warning", "pe-1", "ps-1", "rounded", "text-white", "me-1");
                tag.setAttribute("data-toggle", "tooltip");
                tag.setAttribute("title", "Sports/Games");
                cardTitle.appendChild(tag);
            }


            let cardLocation = document.createElement("p");
            cardLocation.textContent = "Location: " + card['location'];
            cardLocation.classList.add("card-text");


            let cardOwner = document.createElement("p");
            cardOwner.textContent = "Owner: " + card['owner'];
            cardOwner.classList.add("card-text");


            cardDiv.appendChild(cardTitle);
            cardDiv.appendChild(cardDate);
            cardDiv.appendChild(cardDescription);
            cardDiv.appendChild(cardLocation);
            cardDiv.appendChild(cardOwner);

            eventsDiv.appendChild(cardDiv);

        }
    }
}


function accountHandler(event) {
    if (event.target.id === "account") {
        if (localStorage.getItem('email') !== null) {
            window.location.href = "../userPage/user.html";
        } else {
            window.location.href = "../login/login.html";
        }
    }

}



//initializes color mode
setColorMode();
setLoginButton();

renderCards();
// createEventHandler();

//event listeners
colormodeButton.addEventListener("click", switchColorMode);
loginEl.addEventListener("click", loginHandler);
accountEl.addEventListener("click", accountHandler);