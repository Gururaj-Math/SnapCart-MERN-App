import { Router } from "express";
import { registerUser, loginUser, updateUserDetails, getUserDetails, getAllUsersDetails } from "../controller/user.controller.js";

const router = Router()

router.route("/").get(getAllUsersDetails)
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/:userId").get(getUserDetails);
router.route("/update/:userId").put(updateUserDetails);

export default router