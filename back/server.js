import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import handleError from "./src/error.js";
import { registerUser, getUserData } from "../back/src/userController.js";
import { loginUser } from "../back/src/authController.js";
import {
  verifyCredentials,
  authenticateToken,
} from "../back/src/authMiddleware.js";

const app = express();
const port = 3000;

app.use(cors());

app.use((req, res, next) => {
  console.log(`Consulta recibida: ${req.method} ${req.url}`);
  next();
});

app.use(bodyParser.json());

app.post("/usuarios", verifyCredentials, registerUser);
app.post("/login", verifyCredentials, loginUser);
app.get("/usuarios", authenticateToken, getUserData);

app.use(handleError);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
