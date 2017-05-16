import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
            
import firebase from '../firebase'

class Login extends React.Component {
    constructor() {
        super()
        this.state = {}
    }
    render() {
        var { email } = this.props
        if (email) return (
            <Button onClick={this.props.onLogout}>Logout</Button>
        )
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <input type="email" onChange={this.handleEmailChange.bind(this)} />
                <input type="password" onChange={this.handlePasswordChange.bind(this)} />
                <Button type="submit">Login</Button>
            </form>
        )
    }
    handleSubmit(ev){
        ev.preventDefault()
        var { email, password } = this.state
        this.props.onLogin(email, password)
        return false
    }
    handleEmailChange(ev) {
        this.setState({ email: ev.target.value })
    }
    handlePasswordChange(ev) {
        this.setState({ password: ev.target.value })
    }
}

export default connect((state) => {
    return {
        email : state.user.email
    }
}, dispatch => {
    return {
        onLogout() {
            dispatch({ type: 'FIREBASE/USER/LOGOUT' })
        },
        onLogin(email, password){
            var auth = firebase.auth()
            auth.signInWithEmailAndPassword(email, password)
        }
    }
})(Login)
