import axios from 'axios'

export function listLights(selector = 'all') {
    var url = 'https://api.lifx.com/v1/lights/' + selector
    return axios.get(url).then(response => response.data).then(bulbs => {
        return bulbs.map(IBulbModel)
    })
}

export function toggle(selector, duration) {
    var url = 'https://api.lifx.com/v1/lights/' + selector + '/toggle'
    return axios.post(url, {
        duration
    })
}

export function setState(selector, state) {
    var url = 'https://api.lifx.com/v1/lights/' + selector + '/state'
    var color = 'hue:@hue saturation:@saturation'
        .replace('@hue', state.hue)
        .replace('@saturation', state.saturation)
    return axios.put(url, {
        color,
        brightness: state.brightness
    })
}

export function listScenes(selector = 'all') {
    var url = 'https://api.lifx.com/v1/scenes'
    return axios.get(url).then(response => response.data).then(scenes => {
        return scenes.sort((e1, e2) => e1.name.localeCompare(e2.name))
    })
}

export function activateScene(uuid) {
    var url = 'https://api.lifx.com/v1/scenes/scene_id:' + uuid + '/activate'
    return axios.put(url).then(response => response.data)
}

function IBulbModel(b) {
    var bulb = {
        id: b.id,
        label: b.label,
        power: (b.power === 'on'),
        connected: b.connected,
        hue: b.color.hue,
        saturation: b.color.saturation,
        brightness: b.brightness
    }
    return bulb
}