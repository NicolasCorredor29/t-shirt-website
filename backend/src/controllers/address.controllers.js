import { pool } from "../db.js";

export const createAddress = async (req, res) => {
  const data = req.body;
  try {
    await pool.query(
      "INSERT INTO shipping_adresses (user_id, adresses_line, city, state, postal_code, country) VALUES ($1, $2, $3, $4, $5)",
      [data.user_id, data.adress, data.city, data.state, data.postal_code, data.country]
    );
  } catch (err) {
    return res.status(500).json({ message: "Internal error" });
  }
  res.json({ message: "Address created successfully" });
}

export const getAddress = async (req, res) => {
  const { user_id } = req.params;
  try {
    const { rows } = await pool.query("SELECT * FROM shipping_adresses WHERE user_id = $1", [user_id]);
    if (rows.length == 0) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.json(rows);
  } catch (err) {
    return res.status(500).json({ message: "Internal error" });
  }
}

export const updateAddress = async (req, res) => {
  const data = req.body;
  try {
    await pool.query(
      "UPDATE shipping_adresses SET adresses_line = $1, city = $2, state = $3, postal_code = $4, country = $5 WHERE user_id = $6",
      [data.adress, data.city, data.state, data.postal_code, data.country, data.user_id]
    );
  } catch (err) {
    return res.status(404).json({ message: "Address not found" });
  }
  res.json({ message: "Address updated successfully" });
}

export const deleteAddress = async (req, res) => {
  const { user_id } = req.params;
  try {
    await pool.query("DELETE FROM shipping_adresses WHERE user_id = $1", [user_id]);
  } catch (err) {
    return res.status(404).json({ message: "Error deleting the address" });
  }
  res.json({ message: "Address deleted successfully" });
}