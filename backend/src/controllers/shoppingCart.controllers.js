import { pool } from "../db.js";

export const createShoppingCart = async (req, res) => {
  const { user_id } = req.body;
    try {
    await pool.query(
      "INSERT INTO shopping_cart (user_id) VALUES ($1)",
        [user_id])
    } catch (err) {
        return res.status(500).json({ message: "Internal error" });
    }
}

export const getShoppingCart = async (req, res) => {
  const { user_id } = req.params;
  try {
    const { rows } = await pool.query("SELECT ts.* FROM t_shirts ts JOIN cart_items ci ON ts.id = ci.t_shirt_id JOIN shopping_cart sc ON ci.cart_id = sc.id WHERE sc.user_id = $1", [user_id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Cart items not found" });
    }
    res.json(rows);
} catch (err) {
    return res.status(500).json({ message: "Internal error" });
}
}

export const addtoCart = async (req, res) => {
  const data = req.body;
  try {
    await pool.query(
      "INSERT INTO cart_items (cart_id, t_shirt_id, quantity) SELECT sc.id, $2, $3 FROM shoping_carts sc WHERE sc.user_id = $1",
      [data.user_id, data.tshirt_id, data.quantity]
    );
    res.json({ message: "Item quantity updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal error" });
  }
}

export const deletetoCart = async (req, res) => {
  const data = req.body;
  try {
    await pool.query("DELETE FROM cart_items WHERE  cart_id IN ( SELECT id FROM shopping_carts WHERE user_id = $1) AND t_shirt_id = $2", [data.tshirt_id, data.tshirt_id]);
} catch (err) {
    return res.status(500).json({ message: "Internal error" });
}
res.json({ message: "Item deleted successfully" });
}
