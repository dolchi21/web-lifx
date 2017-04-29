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
                {bulbs.sort((e1, e2) => e1.label.localeCompare(e2.label)).map(bulb => {
                    var brightness = bulb.power ? bulb.brightness : 1
                    var style = {
                        backgroundColor: 'hsla(' + bulb.hue + ', ' + bulb.saturation * 100 + '%, ' + brightness * 100 + '%, 1)'
                    }
                    return (
                        <Card key={bulb.id} style={style} title={(
                            <span title={JSON.stringify(bulb, null, 2)}>{bulb.label} ({bulb.id})</span>
                        )} extra={(
                            <PowerToggle id={bulb.id} />
                        )} bodyStyle={style}>
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