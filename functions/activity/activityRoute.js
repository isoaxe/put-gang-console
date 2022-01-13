import { create, all } from "./controller.js";
import { isAuthenticated } from "./../auth/authenticated.js";
import { isAuthorized } from "./../auth/authorized.js";


export default function activityRoute (app) {
	// Create a new activity.
	app.post("/activity/:type",
		isAuthenticated,
		isAuthorized({ hasRole: ["admin", "level-1", "level-2", "level-3", "standard"] }),
		create
	);
	// Fetch all applicable activities.
	app.get("/activity",
		isAuthenticated,
		isAuthorized({ hasRole: ["admin", "level-1", "level-2"] }),
		all
	);
}
