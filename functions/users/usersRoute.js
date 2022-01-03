import { create, all } from "./controller.js";
import { isAuthenticated } from "./../auth/authenticated.js";
import { isAuthorized } from "./../auth/authorized.js";


export function usersRoute (app) {
	// Create a new staff user.
	app.post("/users",
		create
	);
	// Fetch all users within the business.
	app.get("/users",
		isAuthenticated,
		isAuthorized({ hasRole: ["admin", "level-1", "level-2"]}),
		all
	);
}
