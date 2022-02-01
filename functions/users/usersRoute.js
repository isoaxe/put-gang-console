import { create, all, user } from "./controller.js";
import { isAuthenticated } from "./../auth/authenticated.js";
import { isAuthorized } from "./../auth/authorized.js";


export default function usersRoute (app) {
	// Create a new user.
	app.post("/users/:refId/:membLvl",
		create
	);
	// Fetch all users.
	app.get("/users",
		isAuthenticated,
		isAuthorized({ hasRole: ["admin", "level-1", "level-2"] }),
		all
	);
	// Fetch calling users data from Firestore.
	app.get("/users/user",
		isAuthenticated,
		isAuthorized({ hasRole: ["admin", "level-1", "level-2", "level-3", "standard"] }),
		user
	);
}
