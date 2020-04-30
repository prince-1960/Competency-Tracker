import axios from "axios";

export const register = newUser => {
	return axios
		.post("/api/register", {
			empid: newUser.empid,
					email: newUser.email,
					name: newUser.name,
					role: newUser.role,
			password: newUser.password
		})
		.then(response => {
			console.log("Registered");
			return response.data;
		})
		.catch(err => {
			console.log(err);
		});
};

export const login = user => {
	return axios
		.post("/api/validate", {
		    empid: user.empid,
			password: user.password
		})
		.then(response => {
			localStorage.setItem("usertoken", response.data);
			return response.data;
		})
		.catch(err => {
			console.log(err);
		});
};

export const getProfile = user => {
	return axios
		.get("users/profile", {
			//headers: { Authorization: ` ${this.getToken()}` }
		})
		.then(response => {
			console.log(response);
			return response.data;
		})
		.catch(err => {
			console.log(err);
		});
};
