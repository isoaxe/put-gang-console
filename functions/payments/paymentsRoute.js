import { init, create, all } from "./controller.js";
import { isAuthenticated } from "./../auth/authenticated.js";
import { isAuthorized } from "./../auth/authorized.js";


export default function paymentsRoute (app) {
	// Initialize payments for a new user.
	app.post("/payments/init/:uid",
		isAuthenticated,
		isAuthorized({ hasRole: ["admin", "level-1", "level-2", "level-3"]}),
		init
	);
	// Create a new payment for a given user.
	app.post("/payments/:uid/:type",
		isAuthenticated,
		isAuthorized({ hasRole: ["admin", "level-1", "level-2", "level-3"]}),
		create
	);
	// Fetch all payment data.
	app.get("/payments",
		isAuthenticated,
		isAuthorized({ hasRole: ["admin", "level-1", "level-2"]}),
		all
	);
}
