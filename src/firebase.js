import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyAjJeBlC2O0eOJrxsjADDLwM_ajIiacRPY",
    authDomain: "web-lifx.firebaseapp.com",
    databaseURL: "https://web-lifx.firebaseio.com",
    projectId: "web-lifx",
    storageBucket: "web-lifx.appspot.com",
    messagingSenderId: "468691512015"
}
firebase.initializeApp(config)

export default firebase
