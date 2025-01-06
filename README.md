Restructured Code for Employee Competency Tracker.

To Deploy it on your gcp account First run npm install inside the main directory and inside the client directory

Once the installing of dependencies are completed Run "npm run build" inside client folder. This creates a production build for the react front end app.

Once the build is done

Run "gcloud app deploy" from your gcp console.

Make sure the port in Server.js file is 8080. As google forwards all request from 80 to 8080. You will probably get 502 Bad Gateway error if your port is something else as nginx server is not able to correctly forward the request to the node app.
