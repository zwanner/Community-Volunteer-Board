const colormodeButton = document.querySelector("#color-mode");
const colormodeButtonIcon = document.querySelector("#color-mode-icon");
const navbarEl = document.querySelector("#navbar");
const footerEl = document.querySelector("#footer");
const loginEl = document.querySelector("#login");
const userinfoEmailEl = document.querySelector("#userinfo-email");
const userinfoLastLoginEl = document.querySelector("#userinfo-last-login");
const userinfoEventsJoinedEl = document.querySelector("#userinfo-events-joined");
const userinfoEventsCreatedEl = document.querySelector("#userinfo-events-created");
const eventsDiv = document.querySelector("#events-created-div");



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

    }
}

function setLoginButton () {
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

function renderUserData () {
    let email = localStorage.getItem('email');
    let last_login = localStorage.getItem('last_login');
    userinfoEmailEl.textContent += email;
    userinfoLastLoginEl.textContent += dayjs(parseInt(last_login)).format('MM/DD/YYYY');
}

function renderCards() {
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).includes('card')) {
            let card = JSON.parse(localStorage.getItem(localStorage.key(i)));
            console.log(card['owner']);
            if (card['owner'] == localStorage.getItem('email')) {
                let card = JSON.parse(localStorage.getItem(localStorage.key(i)));
                console.log(card);
                let cardDiv = document.createElement("div");
                cardDiv.classList.add("card", "m-3", "p-3", "shadow", "card-event", "mb-4");

                let cardTitle = document.createElement("h5");
                cardTitle.textContent = card['title'];
                cardTitle.classList.add("card-title", "border-3", "border-purple", "pb-2");
                cardDiv.appendChild(cardTitle);

                let cardDate = document.createElement("p");
                cardDate.textContent = "Date: " + card['date'];
                cardDate.classList.add("card-text");
                cardDiv.appendChild(cardDate);

                let cardDescription = document.createElement("p");
                cardDescription.textContent = "Description: " + card['description'];
                cardDescription.classList.add("card-text");
                cardDiv.appendChild(cardDescription);

                let cardLocation = document.createElement("p");
                cardLocation.textContent = "Location: " + card['location'];
                cardLocation.classList.add("card-text");
                cardDiv.appendChild(cardLocation);

                let cardOwner = document.createElement("p");
                cardOwner.textContent = "Owner: " + card['owner'];
                cardOwner.classList.add("card-text");
                cardDiv.appendChild(cardOwner);

                eventsDiv.appendChild(cardDiv);
            }
        }
    }
}




//initializes color mode
setColorMode();
setLoginButton();
renderUserData();
renderCards();

//event listeners
colormodeButton.addEventListener("click", switchColorMode);
loginEl.addEventListener("click", loginHandler);
//createEventButton.addEventListener("click", createEvent());
