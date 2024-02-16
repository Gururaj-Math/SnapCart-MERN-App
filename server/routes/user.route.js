import { Router } from "express";
import { registerUser, loginUser, updateUserDetails, getUserDetails, getAllUsersDetails, followUser,unfollowUser, checkIfFollowing } from "../controller/user.controller.js";

const router = Router()

router.route("/").get(getAllUsersDetails)
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/:userId").get(getUserDetails);
router.route("/update/:userId").put(updateUserDetails);
router.route("/:userId/follow").post(followUser);
router.route("/:userId/unfollow").post(unfollowUser);
router.route("/:userId/isFollowing").get(checkIfFollowing)

export default router