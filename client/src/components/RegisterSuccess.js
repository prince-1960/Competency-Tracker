import React, { Component } from 'react'

class RegisterSuccess extends Component {

  componentDidMount() {
      document.getElementsByTagName('body')[0].className = 'page-error layout-full';
  }

  render() {
    return (
      <div class="page vertical-align text-center">
          <div class="page-content vertical-align-middle">
              <br/><br/><br/>
              <header>
                  <h1>Success</h1>
                    <p class="error-advise font-size-30 bold">Account Created Successfully..</p>
              </header>
                   <a class="btn btn-primary btn-round" href="/login">Login</a>
          </div>
      </div>
    )
  }
}

export default RegisterSuccess
