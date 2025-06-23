import { pool } from "../db.js";

export const getUsers = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM users");

  res.json(rows);
};

export const getUser = async (req, res) => {
  const { id } = req.params;

  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

  if (rows.length == 0) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(rows[0]);
};

export const createUser = async (req, res) => {
  try {
    const data = req.body;

  const { rows } = await pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
    [data.name, data.email]
  );
  return res.json(rows[0]);

  } catch (error) {

    if (error?.code === "23505"){
        return res.status(409).json({message: "Email already exists"})
    }
    return res.status(500).json({message: "Internal error"})
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
