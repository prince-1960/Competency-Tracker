import React, { Component } from "react";

class LoginError extends Component {
	componentDidMount() {
		document.getElementsByTagName("body")[0].className = "page-error layout-full";
	}

	render() {
		return (
			<div class="page vertical-align text-center">
				<div class="page-content vertical-align-middle">
					<br />
					<br />
					<br />
					<header>
						<h1>401</h1>

						<p class="error-advise font-size-30 bold">User Authentication Failed</p>
					</header>
					<p class="Agry font-size-20">Incorrect Username or Password Supplied</p>
					<br />
					<br />

					<a class="btn btn-primary btn-round" href="/login">
						Back to Login
					</a>
				</div>
			</div>
		);
	}
}

export default LoginError;
