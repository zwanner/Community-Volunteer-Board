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

let now = dayjs(new Date());
//localStorage.setItem('cards', cards);

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

let testCard = {
    title: "Test Card",
    id: "card",
    description: "This is a test card",
    date: "10/10/2021",
    location: "Test Location",
    contact: "Test Contact",
    owner: "Test Owner"
};

let testCard2 = {
    title: "Test Card 2",
    id: "card",
    description: "This is a test card 2",
    date: "12/12/2021",
    location: "Test Location 2",
    contact: "Test Contact 2",
    owner: "tester2@gmail.com"
};


//console.log(getCards());
storeCard(testCard);
storeCard(testCard2);
loadCards();

