import { Router } from "express";
import { registerUser, loginUser, updateUserDetails } from "../controller/user.controller.js";

const router = Router()

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/update/:userId").put(updateUserDetails);

export default router