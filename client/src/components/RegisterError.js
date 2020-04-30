import React, { Component } from 'react'

class RegisterError extends Component {

  componentDidMount() {
      document.getElementsByTagName('body')[0].className = 'page-error layout-full';
  }

  render() {
    return (
<div class="page vertical-align text-center">
    <div class="page-content vertical-align-middle">
        <br/>
        <br/>
        <br/>
        <header>
            <h1>422</h1>

            <p class="error-advise font-size-30 bold">User Registration Failed</p>
        </header>
        <p class="Agry font-size-20">Email or Username already Exists...</p>
        <br/>
        <br/>

        <a class="btn btn-primary btn-round" href="/register">Back to User Registration</a>
        <br/>
        <br/>
  <a class="btn btn-primary btn-round" href="/login">Login</a>

    </div>
</div>
    )
  }
}

export default RegisterError
