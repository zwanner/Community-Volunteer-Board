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
let count = 0;
localStorage.setItem('cards', cards);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const auth = firebase.auth();

//stores all the cards in the database
function storeCard(card) {
    let database_ref = database.ref();
    card.id += count;
    count++;
    database_ref.child('cards/' + card.id).set(card);
}

//loads all the cards from the database
function loadCards() {
    let database_ref = database.ref();

    database_ref.child('cards').get().then(function(snapshot) {
        if (snapshot.exists()) {
            //set cards to the snapshot value
            let cards = snapshot.val();
            //get all the item ids of the cards
            let itemIds = Object.keys(cards);
            for (let i = 0; i < itemIds.length; i++) {
                let card = cards[itemIds[i]];
                localStorage.setItem(itemIds[i], JSON.stringify(card));
            }
        } else {
            console.log("No data available");
        }
    }).catch(function(error) {
        console.error(error);
    });

}

//adds a card to local storage
function addCard(card) {
    let cards = localStorage.getItem('cards');
    cards.push(card);
    localStorage.setItem('cards', cards);
}

//removes a card from local storage
function removeCard(card) {
    let cards = localStorage.getItem('cards');
    cards = cards.filter(c => c !== card);
    localStorage.setItem('cards', cards);
}


//returns all the cards in local storage
function getCards() {
    return localStorage.getItem('cards');
}

//clears all the cards in local storage
function clearCards() {
    localStorage.setItem('cards', []);
}

//returns a card from local storage
function getCard(card) {
    let cards = localStorage.getItem('cards');
    return cards.find(c => c === card);
}

let testCard = {
    title: "Test Card",
    id: "card",
    description: "This is a test card",
    date: new Date(),
    location: "Test Location",
    contact: "Test Contact",
    owner: "Test Owner"
};

let testCard2 = {
    title: "Test Card 2",
    id: "card",
    description: "This is a test card 2",
    date: new Date(),
    location: "Test Location 2",
    contact: "Test Contact 2",
    owner: "Test Owner 2"
};


//console.log(getCards());
storeCard(testCard);
storeCard(testCard2);
loadCards();

