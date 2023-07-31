import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import router from "./routes";
import dotenv from "dotenv";
import walletRouter from './routes';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error("MongoDB connection URI not provided in the environment.");
  process.exit(1);
}

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to Database...");
  })
  .catch((err) => {
    console.error("Error connecting to Database:", err);
  });

app.use("/", router);
app.use('/wallets', walletRouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
