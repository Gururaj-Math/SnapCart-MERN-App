import { Router } from "express";
import {
    getAllPosts,
    createPost,
    savePost,
    getIdsOfSavedPosts,
    getSavedPosts,
    getUserPosts,
    deleteUserPosts,
    updateUserPost,
    removeSavedPost,
    getPostById,
    likePost,
    unlikePost
} from "../controller/posts.controller.js";

const router = Router();

router.route("/").get(getAllPosts);
router.route("/create").post(createPost);
router.route("/save").post(savePost);
router.route("/saved/ids/:userId").get(getIdsOfSavedPosts);
router.route("/saved/:userId").get(getSavedPosts);
router.route("/user/:userId").get(getUserPosts);
router.route("/delete/:postId").delete(deleteUserPosts);
router.route("/update/:postId").put(updateUserPost);
router.route("/remove/saved/:userId/:postId").delete(removeSavedPost);
router.route("/:id").get(getPostById);
router.route("/like/:postId").post(likePost);
router.route("/unlike/:postId").post(unlikePost);

export default router;
