import { pool } from "../db.js";

export const getDesigns = async (req, res) => {
    const { artist_id } = req.params
  const { rows } = await pool.query("SELECT * FROM designs WHERE artist_id = $1", [artist_id]);
  if (rows.length == 0) {
    return res.status(404).json({ message: "Designs not found" });
  }
  res.json(rows);
};

export const createDesigns = async (req,res) => {
    try{
    const data = req.body
    const { rows } = await pool.query("INSERT INTO designs (artist_id, category_id, title, description, image_url) VALUES ($1, $2, $3, $4, $5)", [data.artist_id, data.category_id, data.title, data.description, data.image_url])
    } catch (error){
        if (error?.code === "23505"){
        return res.status(409).json({message: "Design already exists"})
    }
    return res.status(500).json({message: "Internal error"})
    }
}

