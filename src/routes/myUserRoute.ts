import express from "express";
const router = express.Router();
import MyUserController from "../controllers/MyUserController"
import jwtCheck from "../middleware/auth";

// posting content
router.post("/", jwtCheck, MyUserController.CreateUser);

export default router;