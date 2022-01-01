const { isAuthenticated } = require("./auth/authenticated");


exports.userRoute = function (app) {
	// Fetch all users within the business.
	app.get("/users",
		isAuthenticated
	);
}
