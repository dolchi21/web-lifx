import React from 'react'
import firebase from '../firebase'

class UserCounter extends React.Component {
    constructor() {
        super()
        this.state = {
            count: 0
        }
    }
    render() {
        return (
            <div>{this.state.count}</div>
        )
    }
    componentWillMount() {
        var dbUsers = firebase.database().ref().child('users')
        dbUsers.on('value', snap => {
            var users = snap.val()
            if (!users.length) return
            this.setState({
                count: users.length
            })
        })
    }
}

export default UserCounter
