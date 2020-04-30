import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class Navbar extends Component {
	logOut(e) {
		e.preventDefault();
		localStorage.removeItem("usertoken");
		 localStorage.removeItem("EmpId"); 
		this.props.history.push(`/login`);
	}

	render() {
		return (
			<nav
				class="site-navbar navbar navbar-default navbar-fixed-top navbar-mega navbar-inverse navbar-inverse bg-primary-blue-400"
				role="navigation"
			>
				<div class="navbar-container container-fluid">
					<div
						class="collapse navbar-collapse navbar-collapse-toolbar"
						id="site-navbar-collapse"
					>
						<ul class="nav navbar-toolbar navbar-right navbar-toolbar-right">
							<li class="nav-item dropdown">
								<a
									class="nav-link navbar-avatar"
									data-toggle="dropdown"
									href="#"
									aria-expanded="false"
									data-animation="scale-up"
									role="button"
								>
									<i class="fa fa-user-circle fa-2x" />
								</a>
								<div class="dropdown-menu" role="menu">
									<a
										class="dropdown-item"
										href=""
										onClick={this.logOut.bind(this)}
										role="menuitem"
									>
										<i class="fa fa-sign-out" aria-hidden="true" /> Logout
									</a>
								</div>
							</li>
						</ul>
						<div class="navbar-brand navbar-brand-center">
							<img
								class="navbar-brand-logo navbar-brand-logo-normal"
								src="/images/logotop36.png"
								title="TechJunkies"
							/>
						</div>
					</div>
				</div>
			</nav>
		);
	}
}

export default withRouter(Navbar);
