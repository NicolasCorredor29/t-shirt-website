import { pool } from "../db.js";

export const createShoppingCart = async (req, res) => {
  const { user_id } = req.params;
  try {
    await pool.query("INSERT INTO shopping_carts (user_id) VALUES ($1)", [
      user_id,
    ]);
    res.json({ message: "Shopping cart created successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal error" });
  }
};

export const getShoppingCart = async (req, res) => {
  const { user_id } = req.params;
  try {
    const { rows } = await pool.query(
      "SELECT ts.*, sc.id AS cart_id, ci.id AS item_id, ci.quantity AS quantity FROM t_shirts ts JOIN cart_items ci ON ts.id = ci.t_shirt_id JOIN shopping_carts sc ON ci.cart_id = sc.id WHERE sc.user_id = $1",
      [user_id]
    );
    if (rows.length == 0) {
      return res.status(404).json({ message: "Cart items not found" });
    }
    res.json(rows);
  } catch (err) {
    return res.status(500).json({ message: "Internal error" });
  }
};

export const addtoCart = async (req, res) => {
  const data = req.body;
  try {
    await pool.query(
      "INSERT INTO cart_items (cart_id, t_shirt_id, quantity) SELECT sc.id, $2, $3 FROM shopping_carts sc WHERE sc.user_id = $1",
      [data.user_id, data.tshirt_id, data.quantity]
    );
    res.json({ message: "Item quantity updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal error" });
  }
};

export const updatetoCart = async (req, res) => {
  const data = req.body;
  try {
    await pool.query(
      "UPDATE cart_items SET quantity = $1 FROM shoping_cart sc WHERE cart_items.cart_id = sc.id AND sc.user_id = $2 AND cart_items.t_shirt_id = $3",
      [data.quantity, data.user_id, data.tshirt_id]
    );
    res.json({ message: "Item quantity updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal error" });
  }
}

export const deletetoCart = async (req, res) => {
  const data = req.body;
  try {
    await pool.query(
      "DELETE FROM cart_items WHERE cart_id IN ( SELECT id FROM shopping_carts WHERE user_id = $1) AND t_shirt_id = $2",
      [data.user_id, data.tshirt_id]
    );
  } catch (err) {
    return res.status(500).json({ message: "Internal error" });
  }
  res.json({ message: "Item deleted successfully" });
};
