// Your web app's Firebase configuration
const firebaseConfig = {

    apiKey: "AIzaSyDTWwdjgaclHbOQo8Z2-AMFieBjUpSa4sM",

    authDomain: "community-volunteer-board.firebaseapp.com",

    projectId: "community-volunteer-board",

    storageBucket: "community-volunteer-board.appspot.com",

    messagingSenderId: "723322511346",

    appId: "1:723322511346:web:8900b3cd6c0a8b1f3e156b",

    measurementId: "G-88Y47ZHVMR"

};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize letiables
const auth = firebase.auth()
const database = firebase.database()

// Set up our register function
function register() {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
        alert('Email or Password is Outta Line!!')
        return
        // Don't continue running the code
    }
    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
        .then(function () {
            // Declare user variable
            let user = auth.currentUser

            // Add this user to Firebase Database
            let database_ref = database.ref()

            // Create User data
            let user_data = {
                email: email,
                last_login: Date.now()
            }

            // Push to Firebase Database
            database_ref.child('users/' + user.uid).set(user_data)

            // DOne
            alert('User Created')
            localStorage.setItem('email', email)
            location.href = '../index.html'
        })
        .catch(function (error) {
            // Firebase will use this to alert of its errors
            let error_code = error.code
            let error_message = error.message

            alert(error_message)
        })
}

// Set up our login function
function login() {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value

    // Validate input fields
    if (validate_email(email) == false) {
        alert('Invalid Email')
        return
        // Don't continue running the code
    }
    if (validate_password(password) == false) {
        alert('Invalid Password')
        return
        // Don't continue running the code
    }


    auth.signInWithEmailAndPassword(email, password)
        .then(function () {
            // Declare user letiable
            let user = auth.currentUser

            // Add this user to Firebase Database
            let database_ref = database.ref()

            // Create User data
            let user_data = {
                last_login: Date.now()
            }

            // Push to Firebase Database
            database_ref.child('users/' + user.uid).update(user_data)

            // DOne
            alert('Logged in as: ' + email)
            localStorage.setItem('email', email)
            location.href = '../index.html'

        })
        .catch(function (error) {
            // Firebase will use this to alert of its errors
            let error_code = error.code
            let error_message = error.message
            alert(error_message)
        })
}




// Validate Functions
function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
        // Email is good
        return true
    } else {
        // Email is not good
        return false
    }
}

function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
        return false
    } else {
        return true
    }
}

function validate_field(field) {
    if (field == null) {
        return false
    }

    if (field.length <= 0) {
        return false
    } else {
        return true
    }
}


let color_mode = localStorage.getItem('colorMode');

//sets background color
function setColorMode() {
    if (color_mode === 'dark') {
        document.body.classList.remove('bg-pattern-light');
        document.body.classList.add('bg-pattern-dark');
    }
    if (colorMode === 'light') {
        document.body.classList.remove('bg-pattern-dark');
        document.body.classList.add('bg-pattern-light');
    }
}

setColorMode();


