const colormodeButton = document.querySelector("#color-mode");
const colormodeButtonIcon = document.querySelector("#color-mode-icon");
const navbarEl = document.querySelector("#navbar");
const footerEl = document.querySelector("#footer");
const loginEl = document.querySelector("#login");
const eventFormEl = document.querySelector('#event-form');
const accountEl = document.querySelector('#account');
const eventsEl = document.querySelector('#events');
const eventContainerEl = document.querySelector('#event-container');

function FormSubmit(event) {
    event.preventDefault();
    const usernameEl = document.querySelector('#username')
    const usernameVal = document.querySelector('#username').value;
    if (!usernameVal) {
        usernameEl.setAttribute('placeholder', 'Please enter your username!');
        document.getElementById('submit').disabled = true
    }
    const descriptionVal = document.querySelector('#desc').value;
    const eventPhotoEl = document.querySelector('#event-photo');
    const commentChkboxEl = document.querySelector('#comments');
    const achBdgEl = document.querySelector('#ach-bdg');

    let cardEl = document.createElement('div');
    let cardHeaderEl = document.createElement('div');
    let cardBodyEl = document.createElement('div');
    let commentEnabledEl = document.createElement('p');
    console.log(commentEnabledEl.checked);
    if (commentChkboxEl.checked) {
        commentEnabledEl.textContent = "Comments enabled";
    } else {
        commentEnabledEl.textContent = "Comments disabled";
    };
let achBdgEnabledEl = document.createElement('p');
if (achBdgEl.checked) {
    achBdgEnabledEl.textContent = "Badges and Acheivements enabled"
} else {
    achBdgEnabledEl.textContent = "Badges and Acheivemnts disabled"
}
    let descriptionEl = document.createElement('p');
    descriptionEl.textContent = descriptionVal;
    let cardTitleEl = document.createElement('h3');
    cardTitleEl.textContent = usernameVal;
    cardHeaderEl.appendChild(cardTitleEl);
    cardEl.appendChild(cardHeaderEl);
    cardEl.appendChild(cardBodyEl);
    cardBodyEl.appendChild(descriptionEl);
    cardBodyEl.appendChild(commentEnabledEl);
    cardBodyEl.appendChild(achBdgEnabledEl);
    eventContainerEl.appendChild(cardEl);
}

eventFormEl.addEventListener('submit', FormSubmit);



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
        //change events color to dark
        eventsEl.classList.remove("bg-dark", "text-light");
        eventsEl.classList.add("bg-light", "text-dark");

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
        //change events color to light
        eventsEl.classList.remove("bg-light", "text-dark");
        eventsEl.classList.add("bg-dark", "text-light");

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
        window.location.href = "./login/login.html";
    }

}

function accountHandler(event) {
    if (event.target.id === "account") {
        if (localStorage.getItem('email') !== null) {
            window.location.href = "./userPage/user.html";
        } else {
            window.location.href = "./login/login.html";
        }
    }

}

function eventsHandler(event) {
    if (event.target.id === "events") {
        window.location.href = "./events/events.html";
    }
}


//initializes color mode
setColorMode();
setLoginButton();

//event listeners
colormodeButton.addEventListener("click", switchColorMode);
loginEl.addEventListener("click", loginHandler);
accountEl.addEventListener("click", accountHandler);
eventsEl.addEventListener("click", eventsHandler);