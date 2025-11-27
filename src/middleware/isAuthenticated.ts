import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
	const token = req.cookies["access-token"];
	if (!token)
		return res.redirect("/login");


	const decoded = jwt.verify(token, "secret");
	if (!decoded)
		return res.status(401).json({ message: "Invalid Credentials" });

	req.user = decoded;
	return next();

};

export default authenticate;