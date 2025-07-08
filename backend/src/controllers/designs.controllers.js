import { pool } from "../db.js";

export const getDesigns = async (req, res) => {
  const { rows } = await pool.query("SELECT d.*, u.username AS artist_name FROM designs d INNER JOIN users u ON d.artist_id = u.id");
  res.json(rows);
};

export const getArtDesigns = async (req, res) => {
  const { artist_id } = req.params;
  const { rows } = await pool.query(
    "SELECT d.*, u.username AS artist_name FROM designs d INNER JOIN users u ON d.artist_id = u.id WHERE d.artist_id = $1",
    [artist_id]
  );
  if (rows.length == 0) {
    return res.status(404).json({ message: "Designs not found" });
  }
  res.json(rows);
};

export const getDesign = async (req, res) => {
  const { title } = req.params
  const { rows } = await pool.query("SELECT d.*, u.username AS artist_name FROM designs d INNER JOIN users u ON d.artist_id = u.id WHERE d.title = $1", [title])
  if (rows.length == 0){
    return res.status(404).json({message: "Designs not found"})
  }
  res.json(rows)
}

export const getOneDesign = async (req, res) => {
  const { id } = req.params
  const { rows } = await pool.query("SELECT d.*, u.username AS artist_name FROM designs d INNER JOIN users u ON d.artist_id = u.id WHERE d.id = $1", [id])
  if (rows.length == 0){
    return res.status(404).json({message: "Error in the search of the design"})
  }
  res.json(rows)
}

export const getFavDesigns = async (req, res) => {
  const { user_id } = req.params;
  const { rows } = await pool.query(
    "SELECT d.*, u.username AS artist_name FROM designs d JOIN favorites fav ON d.id = fav.design_id JOIN users u ON fav.user_id = u.id WHERE u.id = $1",
    [user_id]
  );
  if (rows.length == 0) {
    return res
      .status(404)
      .json({ message: "The user doesn't have favorite design" });
  }
  res.json(rows);
};

export const createDesign = async (req, res) => {
  try {
    const data = req.body;
    await pool.query(
      "INSERT INTO designs (artist_id, category_id, title, description, image_url) VALUES ($1, $2, $3, $4, $5)",
      [
        data.artist_id,
        data.category_id,
        data.title,
        data.description,
        data.image_url
      ]
    );
    res.json({ message: "Design created successfully" });
  } catch (err) {
    if (err?.code === "23505") {
      return res.status(409).json({ message: "Design already exists" });
    }
    return res.status(500).json({ message: "Internal error" });
  }
};

export const updateDesign = async (req, res) => {
  const data = req.body;

  try {
    await pool.query(
      "UPDATE designs SET category_id = $1, title = $2, description = $3, image_url = $4 WHERE artist_id = $5",
      [
        data.category_id,
        data.title,
        data.description,
        data.image_url,
        data.artist_id
      ]
    );
  } catch (err) {
    return res.status(404).json({ message: "Design not found" });
  }

  return res.status(200).json({ message: "Design updated succesfully" });
};

export const deleteDesign = async (req, res) => {
  const data = req.body;

  try {
    await pool.query(
      "DELETE FROM designs WHERE artist_id = $1 AND id = $2",
      [data.artist_id, data.id]
    );
  } catch (err) {
    return res.status(404).json({ message: "Design Not found" });
  }
  return res.sendStatus(200).json({ message: "Design deleted succesfully" });
};
