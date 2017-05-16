import store from './store'
import firebase from './firebase'

var db = firebase.database()
var auth = firebase.auth()

auth.onAuthStateChanged(user => {
    store.dispatch({
        type: 'FIREBASE/USER',
        payload: user
    })
})
auth.signInWithEmailAndPassword('dolchi21@web-lifx.com', 'incorrect')
//auth.createUserWithEmailAndPassword('dolchi21@web-lifx.com', 'incorrect')

store.subscribe(() => {
    var state = store.getState()
    if (state.user.uid) {
        db.ref('users').child(state.user.uid).child('state').set(state)
    }
})
