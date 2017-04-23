import React from 'react'
import { connect } from 'react-redux'
import { Card } from 'antd'

import ColorControl from './ColorControl'
import PowerToggle from './PowerToggle'

class BulbsList extends React.Component {
    render() {
        var { bulbs } = this.props
        return (
            <div>
                {bulbs.map(bulb => {
                    var brightness = bulb.power ? bulb.brightness : 1
                    var style = {
                        backgroundColor: 'hsla(' + bulb.hue + ', ' + bulb.saturation * 100 + '%, ' + brightness * 100 + '%, 1)'
                    }
                    return (
                        <Card key={bulb.id} style={style} title={(
                            <div>{bulb.label}</div>
                        )} extra={(
                            <PowerToggle id={bulb.id} />
                        )} bodyStyle={style}>
                            <div title={JSON.stringify(bulb, null, 2)}>{bulb.id}</div>
                            <ColorControl id={bulb.id} />
                        </Card>
                    )
                })}
            </div>
        )
    }
}

export default connect(state => {
    return {
        bulbs: state.bulbs
    }
}, dispatch => {
    return {}
})(BulbsList)
