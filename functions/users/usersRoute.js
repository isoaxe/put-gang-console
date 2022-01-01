import { isAuthenticated } from "./../auth/authenticated.js";


export function usersRoute (app) {
	// Fetch all users within the business.
	app.get("/users",
		isAuthenticated
	);
}
