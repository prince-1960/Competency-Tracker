import React, { Component } from "react";
import { login } from "./UserFunctions";

class Login extends Component {
	constructor() {
		super();
		this.state = {
			empid: "",
			password: "",
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	onSubmit(e) {
		e.preventDefault();

		const user = {
			empid: this.state.empid,
			password: this.state.password
		};

		login(user).then(res => {
			if (res) {
				 localStorage.setItem('EmpId', this.state.empid);
				 if(this.state.empid == 1506395) {
					 this.props.history.push({
					 pathname: '/home',


		 })
	 } else {
				this.props.history.push({
       pathname: '/profile',

	  state: { empid: this.state.empid }
	})
	}
			} else {
				this.props.history.push("/loginerror");
			}
		});
	}
	componentDidMount() {
		document.getElementsByTagName("body")[0].className =
			"page-login-min layout-full page-dark";
	}

	render() {
		return (
			<div class="page">
				<div class="page-content">
					<div class="page-brand-info">
						<div class="brand">
							<img class="brand-img" src="/images/logoblack.png" alt="..." />
							<br />
							<h2 class="brand-text font-size-30">Employee Competency Tracker</h2>
						</div>
					</div>

					<div class="page-login-main">

            <img class="brand-imgmid" src="/images/main.png" alt="..." />



						<div class="brand hidden-md-up">
							<img class="brand-img" src="/images/logo.png" alt="..." />
						</div>
						<h3 class="font-size-24 bold">Login</h3>

						<form onSubmit={this.onSubmit}>
							<div
								class="form-group form-material floating"
								data-plugin="formMaterial"
							>
								<label htmlFor="empid" for="inputEmpid">
									Emp Id
								</label>
								<input
									type="text"
									class="form-control empty"
									required
									id="inputEmpid"
									name="empid"
									value={this.state.empid}
									onChange={this.onChange}
								/>
							</div>
							<div
								class="form-group form-material floating"
								data-plugin="formMaterial"
							>
								<label htmlFor="password" for="inputPassword">
									Password
								</label>
								<input
									type="password"
									minlength="4"
									required
									class="form-control empty"
									id="inputPassword"
									name="password"
									value={this.state.password}
									onChange={this.onChange}
								/>
							</div>
							<button type="submit" class="btn btn-primary btn-block">
								Login
							</button>
						</form>
  <p>New User ? <a href="/register">Register</a></p>
						<footer class="page-copyright">
							<p>TCS Ninja</p>
							<p>© 2020. All RIGHT RESERVED.</p>
						</footer>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;
