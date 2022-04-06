/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 *     <li>dislikes</li>
 * </ul>
 *
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */
import express, { Request, Response } from "express";
import CourseController from "./controllers/CourseController";
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";
import SessionController from "./controllers/SessionController";
import AuthenticationController from "./controllers/AuthenticationController";
import DislikeController from "./controllers/DislikeController";
import mongoose from "mongoose";
import GroupController from "./controllers/GroupController";
import "dotenv/config";
const cors = require("cors");
const session = require("express-session");

// build the connection string
const PROTOCOL = "mongodb+srv";
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const HOST = "cluster0.hejjh.mongodb.net";
const DB_NAME = "myFirstDatabase";
const DB_QUERY = "retryWrites=true&w=majority";
const connectionString = `${PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${HOST}/${DB_NAME}?${DB_QUERY}`; // connect to the database
mongoose.connect(connectionString);

const app = express();

let origin = "http://localhost:3000";
if (process.env.ENVIRONMENT === "PRODUCTION" && process.env.CORS_ORIGIN)
    origin = process.env.CORS_ORIGIN;

app.use(
    cors({
        credentials: true,
        origin,
    })
);

const SECRET = process.env.SECRET;
let sess = {
    secret: SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: {
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production",
    },
};

if (process.env.ENVIRONMENT === "PRODUCTION") {
    app.set("trust proxy", 1); // trust first proxy
    sess.cookie.secure = true; // serve secure cookies
}

app.use(session(sess));
app.use(express.json());

app.get("/", (req: Request, res: Response) => res.send("Welcome!"));

TuitController.getInstance(app);
UserController.getInstance(app);
DislikeController.getInstance(app);
// create RESTful Web service API
UserController.getInstance(app);
TuitController.getInstance(app);
LikeController.getInstance(app);
SessionController(app);
AuthenticationController(app);
GroupController(app);
/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
