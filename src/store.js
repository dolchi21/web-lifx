import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'

var middleware = applyMiddleware(createLogger())

var defaultState = {
    token: 'ca0987ea7ac629b43f5a2aaa437ddf6f0da754ce8fecc7bd92a0c0cd7049ae87',
    bulbs: [],
    scenes: []
}
var store = createStore((state, action) => {
    var { type, payload } = action
    switch (type) {
        case 'USER/TOKEN':
            localStorage.token = payload
            configureAxios(payload)
            return {
                ...state,
                token: payload
            }
        case 'SCENES':
            return {
                ...state,
                scenes: payload
            }
        default:
            return {
                ...state,
                bulbs: bulbsReducer(state.bulbs, action),
                user: userReducer(state.user, action)
            }
    }
}, defaultState, middleware);

function userReducer(state = {}, action) {
    var { type, payload } = action
    switch (type) {
        case 'FIREBASE/USER':
            return Object.assign({}, state, {
                uid: payload.uid,
                email: payload.email
            })
        case 'FIREBASE/USER/LOGOUT':
            return {}
        default:
            return state
    }
}

function bulbsReducer(state = [], action) {
    var { type, payload } = action
    switch (type) {
        case 'BULBS':
            return payload
        case 'BULB': {
            return state.map(bulb => {
                if (bulb.id === payload.id) {
                    return payload
                }
                return bulb
            })
        }
        case 'BULB/COLOR': {
            return state.map(bulb => {
                if (bulb.id === payload.id) {
                    Object.assign(bulb, payload.color)
                }
                return bulb
            })
        }
        case 'BULB/TOGGLE': {
            return state.map(bulb => {
                if (bulb.id === payload) {
                    bulb.power = !bulb.power
                }
                return bulb
            })
        }
        default:
            return state
    }
}

store.dispatch({
    type: 'USER/TOKEN',
    payload: localStorage.token || 'ca0987ea7ac629b43f5a2aaa437ddf6f0da754ce8fecc7bd92a0c0cd7049ae87'
})

function configureAxios(token) {
    var axios = require('axios')
    axios.defaults.headers['Authorization'] = 'Bearer ' + token
}

export default store
