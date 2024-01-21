import bcrypt from "bcrypt";
import db from "./db.js";

const registerUser = async (req, res, next) => {
  const { email, password, rol, lenguage } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await db.query(
      "INSERT INTO usuarios(email, password, rol, lenguage) VALUES($1, $2, $3, $4) RETURNING *",
      [email, hashedPassword, rol, lenguage]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    next(error); // Pasa el error al middleware de manejo de errores
  }
};

const getUserData = async (req, res, next) => {
  const { email } = req.user;

  try {
    const result = await db.query("SELECT * FROM usuarios WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    res.json(user);
  } catch (error) {
    console.error(error);
    next(error); // Pasa el error al middleware de manejo de errores
  }
};

export { registerUser, getUserData };
