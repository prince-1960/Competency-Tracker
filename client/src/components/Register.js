import React, { Component } from 'react'
import { register } from './UserFunctions'


class Register extends Component {
  constructor() {
    super()
    this.state = {
      empid: '',
      email: '',
      password: '',
      role: '',
      name: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()

    const newUser = {
      empid: this.state.empid,
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      role: this.state.role
    }

    const errors = {}
    const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    errors.email = !newUser.email.match(emailformat) ?
    "Invalid Email" : ""
    errors.password = newUser.password.length < 4 ?
    "Password should be more than 6 characters" : ""
    console.log(errors)
    register(newUser).then(res => {
if(res) {
            this.props.history.push(`/success`)
} else {
  this.props.history.push(`/registererror`)
}})
  }
  componentDidMount() {
      document.getElementsByTagName('body')[0].className = 'page-login-min layout-full page-dark';
  }


  render() {
    return (

      <div class="page">
          <div class="page-content">
              <div class="page-brand-info">
              <div class="brand">
                  <img class="brand-img" src="/images/logoblack.png" alt="..." /><br/>
                    <h2 class="brand-text font-size-30">Employee Competency Tracker</h2>
              </div>

              </div>

              <div class="page-login-main">
<img class="brand-imgmidr" src="/images/main.png" alt="..." /><br/><br/><br/>
                  <h3 class="font-size-24 margin-2 bold">Register</h3>

                  <form onSubmit={this.onSubmit}>
                      <div class="form-group form-material floating" data-plugin="formMaterial">
                          <label htmlFor="empid" for="inputEmpid">Emp Id</label>
                          <input type="text" class="form-control empty" required id="inputEmpid" name="empid" value={this.state.empid} onChange={this.onChange} required/>

                      </div>

                      <div class="form-group form-material floating" data-plugin="formMaterial">
                          <label htmlFor="name" for="inputName">Name</label>
                          <input type="text" class="form-control empty" required id="inputName" name="name" value={this.state.name} onChange={this.onChange} required/>

                      </div>

                      <div class="form-group form-material floating" data-plugin="formMaterial">
                          <label htmlFor="email" for="inputEmail">Email</label>
                          <input type="email" class="form-control empty" required id="inputEmail" name="email" value={this.state.email} onChange={this.onChange} required/>

                      </div>

                      <div class="form-group form-material floating" data-plugin="formMaterial">
                          <label htmlFor="password" for="inputPassword">Password</label>
                          <input type="password" minlength="4" required class="form-control empty" id="inputPassword" name="password" value={this.state.password} onChange={this.onChange} required/>

                      </div>

                      <div class="form-group form-material floating" >
                  <select name="role" value={this.state.role} onChange={this.onChange}  class="form-control" required>
                    <option disabled="disabled" value="">Choose</option>
                    <option value="Developer"> Developer</option>
                    <option value="TechLead">Tech lead</option>

                  </select>
                  <label class="floating-label">Role</label>
                </div>
                      <button type="submit" class="btn btn-primary btn-block">Register</button>
                  </form>
                  <p>Have an account ? <a href="/login">Login</a></p>
                  <footer class="page-copyright">
                    <p>TCS Ninja</p>
                    <p>© 2020. All RIGHT RESERVED.</p>
                  </footer>
              </div>

          </div>
      </div>

    )
  }
}

export default Register
