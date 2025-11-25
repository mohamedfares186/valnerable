import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

router.get("/", (req, res) => {
	return res.sendFile(path.join(__dirname, '../../public', 'index.html'));
});

router.post("/search", (req, res) => {
	const { search } = req.body;
	return res.send(`${search} is not found`)
})

router.get("/about", (req, res) => {
	return res.sendFile(path.join(__dirname, '../../public', 'about.html'));
});

router.get("/service", (req, res) => {
	return res.sendFile(path.join(__dirname, '../../public', 'service.html'));
});

router.get("/contact", (req, res) => {
	return res.sendFile(path.join(__dirname, '../../public', 'contact.html'));
});

router.post("/contact/response", (req, res) => {
	const { email, message } = req.body;

	return res.send(`${email} Thanks for Contacting use your message ${message} has reached us and we will review it as soon as possible`)
})

export default router;