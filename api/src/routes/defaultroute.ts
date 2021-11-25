import express from "express";

const router = express.Router();
const env = process.env;

router.get("/", (req, res) => {
    res.send(env.npm_package_version);
});

export default router;
