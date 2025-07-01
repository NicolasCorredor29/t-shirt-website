import { pool } from "../db.js";

export const createTshirt = async (req, res) => {
  const data = req.body;
  try {
    await pool.query(
      "INSERT INTO t_shirts (design_id, size_id, color_id, material_id price, stock) VALUES ($1, $2, $3, $4, $5, $6)",
      [
        data.design_id,
        data.size_id,
        data.color_id,
        data.material_id,
        data.price,
        data.stock
      ]
    );
  } catch (err) {
    return res.status(500).json({ message: "Interan error" });
  }
  res.json({ message: "Tshirt created succesfully" });
};

export const updateTshirt = async (req, res) => {
  const data = req.body;
  try {
    await pool.query(
      "UPDATE t_shirts set design_id = $1 AND size_id = $2, AND color_id = $3 WHERE id = $4",
      [data.design_id, data.size_id, data.color_id, data.tshirt_id]
    );
  } catch (err) {
    return res.status(404).json({ message: "Tshirt not found" });
  }
};

export const deleteTshirt = async (req, res) => {
  const { tshirt_id } = req.params;
  try {
    await pool.query("DELETE FROM t_shirts WHERE id = $1", tshirt_id);
  } catch (err) {
    return res.status(404).json({message: "Error with the tshirt elimination"})
  }
  res.json({message: "Tshirt deleted succesfully"})
};
