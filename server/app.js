import express from "express"
import cors from "cors"

const app = express()

app.use(cors());

app.use(express.json({ limit: "900kb" }));
app.use(express.urlencoded({ extended: true, limit: "900kb" }));
app.use(express.static("public"));

// routes
import userRoute from "./routes/user.route.js";
import postsRoute from "./routes/posts.route.js"
import notesRoute from "./routes/notes.route.js"

app.use("/api/v1/users/", userRoute);
app.use("/api/v1/posts/", postsRoute);
app.use("/api/v1/notes/", notesRoute);

export { app }