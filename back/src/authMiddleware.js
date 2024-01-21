import jwt from "jsonwebtoken";

const secretKey = "tu_clave_secreta_fuerte_y_unica";

const verifyCredentials = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Faltan credenciales" });
  }

  next();
};

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Token recibido en el Backend:", token);

  if (!token) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  try {
    const payload = jwt.verify(token, secretKey);
    req.user = payload;
    next();
  } catch (error) {
    console.error("Error de verificación de token:", error);
    return res.status(403).json({ error: "Token inválido" });
  }
};

export { verifyCredentials, authenticateToken };
