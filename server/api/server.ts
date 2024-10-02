import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
// import cookieParser from "cookie-parser";
// import helmet from "helmet";
// import session from "cookie-session";
require("dotenv").config();
import usersRoute from "./users";

const app = express();
const version = process.env.API_VERSION;

// MIDDLEWARE
// app.use(helmet({crossOriginEmbedderPolicy: false}));
app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  methods: 'GET,PUT,POST', // Specify the HTTP methods you want to allow
}));
app.use(morgan("common", { immediate: true }));

// Routes
app.disable("x-powered-by");

app.use(`/${version}/users`, usersRoute);

const port: number = 4163;

app.listen(port, () => console.log(`Server started on port ${port}`));
