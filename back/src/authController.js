
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import db from "./db.js";

const secretKey = "tu_clave_secreta_fuerte_y_unica";

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const result = await db.query("SELECT * FROM usuarios WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign({ email: user.email }, secretKey);
    res.json({ token });
  } catch (error) {
    console.error(error);
    next(error); // Pasa el error al middleware de manejo de errores
  }
};

export { loginUser };
