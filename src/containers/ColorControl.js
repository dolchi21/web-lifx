import React from 'react'
import { connect } from 'react-redux'
import { Slider } from 'antd'
import * as API from '../api/lifx'

var hueMarks = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360].map(value => {
    return {
        [value]: {
            label: value + '°',
            style: { color: 'hsl(' + value + ', 100%, 50%)' }
        }
    }
}).reduce((e1, e2) => {
    return Object.assign(e1, e2)
})

class ColorControl extends React.Component {
    render() {
        var { hue, saturation, brightness } = this.props
        return (
            <div>
                <div>
                    <h4>Hue</h4>
                    <Slider min={0} max={360} step={5} value={hue} onChange={this.handleHueChange.bind(this)} onAfterChange={this.handleOnAfterChange.bind(this)} marks={hueMarks} />
                </div>
                <div>
                    <h4>Saturation</h4>
                    <Slider min={0} max={1} step={0.05} value={saturation} onChange={this.handleSaturationChange.bind(this)} onAfterChange={this.handleOnAfterChange.bind(this)} marks={{
                        0: 0,
                        '0.25': '25%',
                        '0.5': '50%',
                        '0.75': '75%',
                        1: '100%'
                    }} />
                </div>
                <div>
                    <h4>Brightness</h4>
                    <Slider min={0} max={1} step={0.05} value={brightness} onChange={this.handleBrightnessChange.bind(this)} onAfterChange={this.handleOnAfterChange.bind(this)} marks={{
                        0: 0,
                        '0.25': '25%',
                        '0.5': '50%',
                        '0.75': '75%',
                        1: '100%'
                    }} />
                </div>
            </div>
        )
    }
    handleSaturationChange(saturation) {
        var { hue, brightness } = this.props
        this.props.onChange({ saturation, brightness, hue })
    }
    handleHueChange(hue) {
        var { saturation, brightness } = this.props
        this.props.onChange({ saturation, brightness, hue })
    }
    handleBrightnessChange(brightness) {
        var { saturation, hue } = this.props
        this.props.onChange({ saturation, brightness, hue })
    }
    handleOnAfterChange() {
        var { saturation, brightness, hue } = this.props
        this.props.onAfterChange({ saturation, hue, brightness })
    }
}

export default connect((state, { id }) => {
    var bulb = state.bulbs.find(b => b.id === id)
    return {
        hue: bulb.hue,
        saturation: bulb.saturation,
        brightness: bulb.brightness
    }
}, (dispatch, { id }) => {
    return {
        onAfterChange(color) {
            API.setState(id, color)
        },
        onChange(color) {
            dispatch({
                type: 'BULB/COLOR',
                payload: {
                    id,
                    color
                }
            })
        }
    }
})(ColorControl)