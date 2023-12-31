import express from "express";
import routes from "./routes/index.js";
import connectToDatabase from "./config/dbConnect.js";
import errorHandler from "./middlewares/errorHandler.js";


const connection = await connectToDatabase();

connection.on("error", (erro) => {
  console.error("Connection Error", erro);
});

connection.once("open", () => {
  console.log("Connection to Database Succesfully Established!");
});

const app = express();
routes(app);

app.use(errorHandler);

export default app;
