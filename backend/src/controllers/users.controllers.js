import { pool } from "../db.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  const { rows } = await pool.query(
    "SELECT username, id FROM users WHERE email = $1 AND password = $2",
    [email, password]
  );
  if (rows.length == 0) {
    return res.status(404).json({ message: "User not found" });
  }
  //devuelve username y id
  return res.json(rows[0]);
};

export const createUser = async (req, res) => {
  try {
    const data = req.body;
    const { rows } =await pool.query(
      "INSERT INTO users (username, password, email, rol) VALUES ($1, $2, $3, $4) RETURNING *",
      [data.username, data.password, data.email, data.role]
    );
    return res.status(200).json(rows[0].id);
  } catch (error) {
    if (error?.code === "23505") {
      return res.status(409).json({ message: "Email already exists" });
    }
    return res.status(500).json({ message: "Internal error" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  //el returning devuelve las columnas eliminadas
  const { rowCount } = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [id]
  );
  if (rowCount.length == 0) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.sendStatus(204);
};
