import express from "express";
import connectToDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";

const connection = await connectToDatabase();

connection.on("error", (erro) => {
    console.error("Connection Error", erro);
});

connection.once("open", () => {
    console.log("Connection to Database Succesfully Established!");
});

const app = express();
routes(app);

export default app;
