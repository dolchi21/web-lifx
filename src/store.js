import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'

var middleware = applyMiddleware(createLogger())

var defaultState = {
    token: 'ca0987ea7ac629b43f5a2aaa437ddf6f0da754ce8fecc7bd92a0c0cd7049ae87',
    bulbs: []
}
var store = createStore((state, action) => {
    var { type, payload } = action
    switch (type) {
        case 'USER/TOKEN':
            return {
                ...state,
                token: payload
            }
        case 'BULBS':
            return {
                ...state,
                bulbs: payload
            }
        case 'BULB': {
            let bulbs = state.bulbs.map(bulb => {
                if (bulb.id === payload.id) {
                    return payload
                }
                return bulb
            })
            return { ...state, bulbs }
        }
        case 'BULB/COLOR':{
            let bulbs = state.bulbs.map(bulb => {
                if (bulb.id === payload.id) {
                    Object.assign(bulb, payload.color)
                }
                return bulb
            })
            return { ...state, bulbs }
        }
        case 'BULB/TOGGLE': {
            let bulbs = state.bulbs.map(bulb => {
                if (bulb.id === payload) {
                    bulb.power = !bulb.power
                }
                return bulb
            })
            return { ...state, bulbs }
        }
        default:
            return state
    }
}, defaultState, middleware)

export default store
