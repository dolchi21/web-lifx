import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card } from 'antd'

import ColorControl from './ColorControl'
import PowerToggle from './PowerToggle'

class Bulb extends React.Component {
    render() {
        var props = this.props
        var brightness = props.power ? props.brightness : 1
        var style = {
            backgroundColor: 'hsla(' + props.hue + ', ' + props.saturation * 100 + '%, ' + brightness * (100 - (50 * props.saturation)) + '%, 1)'
        }
        return (
            <Card key={props.id} title={(
                <Link to={'/lights/' + props.id} title={JSON.stringify(props, null, 2)}>{props.label} ({props.id})</Link>
            )} extra={(
                <PowerToggle id={props.id} />
            )} bodyStyle={style} style={{ marginBottom: '0.5rem' }}>
                <ColorControl id={props.id} />
            </Card>
        )
    }
}

export default connect((state, ownProps) => {
    var bulb = state.bulbs.find(bulb => {
        return bulb.id === ownProps.id
    })
    return {
        found: !!bulb,
        ...bulb
    }
})(Bulb)
