import { pool } from "../db.js";

export const createTshirt = async (req, res) => {
  const data = req.body;
  try {
    await pool.query(
      "INSERT INTO t_shirts (design_id, size, color, material, type, price) VALUES ($1, $2, $3, $4, $5, $6)",
      [
        data.design_id,
        data.size,
        data.color,
        data.material,
        data.type,  
        data.price,
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
      "UPDATE t_shirts set design = $1 AND size = $2 AND color = $3 AND type=$4 WHERE id = $5",
      [data.design_id, data.size, data.color, data.type, data.tshirt_id]
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
