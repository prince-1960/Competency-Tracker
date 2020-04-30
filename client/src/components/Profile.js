import React, { Component } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Redirect } from "react-router-dom";
import axios from "axios";
import CompetencyList from './CompetencyList'

class E0 extends Component {
	constructor(props) {
		super(props);
		const token = localStorage.getItem("usertoken");
		const forwardEmpId = localStorage.getItem("EmpId");

		let loggedIn = true;
		if (token == null) {
			loggedIn = false;
		}
		this.state = { users: { Competency: [] }, loggedIn, EmpI : forwardEmpId };
	}

	getUsers() {
		axios
			.get("/fetchdataById/" + this.state.EmpI)
			.then(response => this.setState({ users: response.data }));
	}


	componentDidMount() {
		this.getUsers();
		document.getElementsByTagName("body")[0].className = "page-profile";
	}

	render() {
		if (this.state.loggedIn == false) {
			return <Redirect to="/" />;
		}
		const data = this.state.users.Competency;


		return (
			<main>
				<Navbar />

				<div class="page">
					<div class="page-content container-fluid">
						<div class="row">
							<div class="col-lg-3">
								<div class="card card-shadow text-center">
									<div class="card-block">
										<a class="avatar avatar-lg" href="javascript:void(0)">
											<img
												src="https://raw.githubusercontent.com/prince-1960/cssfile/master/pngguru.com.png"
												alt="..."
											/>
										</a>
										<h4 class="profile-user">{this.state.users.Emp_Name}</h4>
										<br />
										<p class="font-size-16">
											<i class="fa fa-id-badge" aria-hidden="true" />{" "}
											{this.state.users.Emp_Id}
										</p>
										<br />

										<button type="button" class="btn btn-secondary" disabled>
											{this.state.users.Role}
										</button>
										<div class="profile-social">
											<p class="font-size-16">{this.state.users.Email}</p>
										</div>
									</div>
									<div class="card-footer">
<img src="http://localhost:3000/images/logore.png"/>
									</div>
								</div>
							</div>

							<div class="col-lg-9">
								<div class="panel">
									<div class="panel panel-bordered">
										<div class="panel-heading">
											<h2 class="panel-title font-size-20">My Competencies</h2>
										</div>
										<div class="panel-body">
											{data ? (
											<TransactionList/>
											) : (
												<div class="alert alert-warning alert-dismissible" role="alert">
													No Competecny Found.
													<br /> <br />
													Please add acquired competency from below
												</div>
											)}

											<div class="p-10">



											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<Footer />
			</main>
		);
	}
}
export default E0;
