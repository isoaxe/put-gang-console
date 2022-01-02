export function isAuthorized (opts) {
	return (req, res, next) => {
		const { role, email, uid } = res.locals;
		const { id } = req.params;

		if (!role)
			return res.status(403).send({ message: "Forbidden due to lack of role" });

		if (opts.allowSameUser && id && uid === id)
			return next();

		if (opts.hasRole.includes(role))
			return next();

		return res.status(403).send({ message: "Forbidden" });
	};
}
