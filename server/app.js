import express from "express"
import cors from "cors"

const app = express()

app.use(cors());

app.use(express.json({ limit: "900kb" }));
app.use(express.urlencoded({ extended: true, limit: "900kb" }));
app.use(express.static("public"));

// routes


// routes declaration



export { app }