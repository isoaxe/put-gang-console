import { create, stats, invoices, receipts } from "./controller.js";
import { isAuthenticated } from "./../auth/authenticated.js";
import { isAuthorized } from "./../auth/authorized.js";


export default function paymentsRoute (app) {
	// Create a new payment for the current user.
	app.post("/payments/:type",
		isAuthenticated,
		isAuthorized({ hasRole: ["admin", "level-1", "level-2", "level-3", "standard"] }),
		create
	);
	// Fetch statistics for the user and their downlines.
	app.get("/payments/stats",
		isAuthenticated,
		isAuthorized({ hasRole: ["admin", "level-1", "level-2"] }),
		stats
	);
	// Fetch invoices for the user as specified in the param.
	app.get("/payments/invoices/:uid",
		isAuthenticated,
		isAuthorized({ hasRole: ["admin", "level-1", "level-2"] }),
		invoices
	);
	// Fetch receipts for the user as specified in the param.
	app.get("/payments/receipts/:uid",
		isAuthenticated,
		isAuthorized({ hasRole: ["admin", "level-1", "level-2"] }),
		receipts
	);
}
