import React, { Component } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Redirect } from "react-router-dom";
import axios from "axios";

class TechLeadE0 extends Component {
	constructor(props) {
		super(props);
		const token = localStorage.getItem("usertoken");
		let loggedIn = true;
		if (token == null) {
			loggedIn = false;
		}
		this.state = { users: [], loggedIn };
	}

	getUsers() {
		axios
			.get("/Detail/TechLeadE0")
			.then(response => this.setState({ users: response.data }));
	}

	componentDidMount() {
		this.getUsers();
	}

	render() {
		if (this.state.loggedIn == false) {
			return <Redirect to="/" />;
		}

		return (
			<main>
				<Navbar />
				<div class="page">
					<div class="page-content">
						<div class="panel panel-bordered">
							<div class="panel-heading">
								<h2 class="panel-title "> Tech Leads with E0 Competency </h2>
							</div>
							<div class="panel">
								<ul class="list-group">
									{this.state.users.map(item => (
										<li class="list-group-item">
											<div class="media-body align-self-center">
												<h5>
													{item._id.Emp_Name} <small> ({item._id.Emp_Id}) </small>
												</h5>
												{item.Competency.map(sub => (
													<div class="col-sm-6 col-md-3">
														<p class="bold font-size-16 ">
															<li>{sub.Tech}</li>
														</p>
													</div>
												))}
											</div>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</main>
		);
	}
}
export default TechLeadE0;
