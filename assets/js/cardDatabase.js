const firebaseConfig = {

    apiKey: "AIzaSyDTWwdjgaclHbOQo8Z2-AMFieBjUpSa4sM",

    authDomain: "community-volunteer-board.firebaseapp.com",

    projectId: "community-volunteer-board",

    storageBucket: "community-volunteer-board.appspot.com",

    messagingSenderId: "723322511346",

    appId: "1:723322511346:web:8900b3cd6c0a8b1f3e156b",

    measurementId: "G-88Y47ZHVMR"

};


//array of cards
let cards = [];
//id numerator

let now = dayjs(new Date());
//localStorage.setItem('cards', cards);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const auth = firebase.auth();

function guidGenerator() {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

//stores all the cards in the database
function storeCard(card) {
    let database_ref = database.ref();
    card.id += guidGenerator();
    database_ref.child('cards/' + card.id).set(card);
    console.log("Card stored: " + JSON.stringify(card["title"]));
}

//loads all the cards from the database
function loadCards() {
    let database_ref = database.ref();

    database_ref.child('cards').get().then(function (snapshot) {
        if (snapshot.exists()) {
            //set cards to the snapshot value
            let cards = snapshot.val();
            //get all the item ids of the cards
            let itemIds = Object.keys(cards);
            console.log(itemIds);
            for (let i = 0; i < itemIds.length; i++) {
                let card = cards[itemIds[i]];
                localStorage.setItem(itemIds[i], JSON.stringify(card));
            }
        } else {
            console.log("No data available");
        }
    }).catch(function (error) {
        console.error(error);
    });
}

function createCard(title, description, date, location) {
    let card = {
        title: title,
        id: "card",
        description: description,
        date: date,
        location: location,
        owner: localStorage.getItem('email')
    };
    return card;
}

async function modalCreateCard() {

    const modalButtonEl = document.getElementById('modal-create-event');

    // Create a promise that resolves when the modal is closed
    const modalClosedPromise = new Promise((resolve) => {
        modalButtonEl.addEventListener('click', () => {
            resolve();
        });
    });

    // Wait for the modal to be closed
    await modalClosedPromise;

    // ... rest of the code ...
    let titleinputEl = document.getElementById('title-input');
    let dateinputEl = document.getElementById('date-input');
    let locationinputEl = document.getElementById('location-input');
    let descriptioninputEl = document.getElementById('description-input');


    let title = titleinputEl.value;
    let date = dateinputEl.value;
    let location = locationinputEl.value;
    let description = descriptioninputEl.value;

    let card = createCard(title, description, date, location);
    storeCard(card);
    alert("Event created: " + title + " on " + date + " at " + location + " Please Reload the page to see the event");
}



//console.log(getCards());
loadCards();

const createEventButton = document.querySelector("#create-event");
if (localStorage.getItem('email') == null) {
    createEventButton.disabled = true;
}


createEventButton.addEventListener('click', modalCreateCard);




