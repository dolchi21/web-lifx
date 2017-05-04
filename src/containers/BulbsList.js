import React from 'react'
import { connect } from 'react-redux'

import Bulb from './Bulb'

class BulbsList extends React.Component {
    render() {
        var { bulbs } = this.props
        return (
            <div>
                {bulbs.sort((e1, e2) => e1.label.localeCompare(e2.label)).map(bulb => (
                    <Bulb id={bulb.id} key={bulb.id}/>
                ))}
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
