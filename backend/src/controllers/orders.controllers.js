import { pool } from "../db.js";

export const getOrders = async (req, res) => {
    const { user_id } = req.params;
  const { rows } = await pool.query("SELECT * FROM orders where user_id = $1", [user_id]);
  if (rows.length === 0) {
    return res.status(404).json({ message: "Orders not found" });
  }
  res.json(rows);
}

export const createOrder = async (req, res) => {
  const data = req.body;
  try {
    await pool.query(
      "INSERT INTO orders (user_id, shipping_address_id, status) VALUES ($1, $2, $3)",
      [data.user_id, data.address, data.status]
    );
  } catch (err) {
    return res.status(500).json({ message: "Internal error" });
  }
  res.json({ message: "Order created successfully" });
}

export const addtoOrder = async (req, res) => {
  const data = req.body;
  try {
    await pool.query(
      "INSERT INTO order_items (order_id, t_shirt_id, quantity, price) VALUES ($1, $2, $3, $4)",
      [data.order_id, data.tshirt_id, data.quantity, data.total_price]
    );
  } catch (err) {
    return res.status(500).json({ message: "Internal error" });
  }
}

export const deleteOrder = async (req, res) => {
  const { order_id } = req.params;
  try {
    await pool.query("DELETE FROM orders WHERE id = $1", [order_id]);
  } catch (err) {
    return res.status(404).json({ message: "Error deleting the order" });
  }
  res.json({ message: "Order deleted successfully" });
}

