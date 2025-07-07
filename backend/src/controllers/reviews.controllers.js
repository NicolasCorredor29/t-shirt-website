import { pool } from "../db.js";

export const getReviews = async (req, res) => {
    const { rows } = pool.query("SELECT * FROM product_reviews")
    if (rows.length == 0){
        return res.status(404).json({message: "Reviews not found"})
    }
    res.json(rows)
}

export const getReview = async (req, res) => {
    const { design_id } = req.params
    const { rows } = pool.query("SELECT * FROM product_reviews WHERE design_id = $1", [design_id])
    if (rows.length == 0){
        return res.status(404).json({message: "Review not found"})
    }
    res.json(rows)
}

export const createReview = async (req, res) => {
    const data = req.body
    try{
        pool.query("INSERT INTO product_reviews (user_id, design_id, rating, comment) VALUES ($1, $2, $3, $4)", [data.user_id, data.design_id, data.rating_id, data.comment])
    }catch (err) {
        return res.status(500).json({message: "Internal error, review not created"})
    }
    res.json({message: "Review created succesfully"})
}

export const deleteReview = async (req, res) => {
    const { design_id } = req.params
    try {
        await pool.query("DELETE FROM product_reviews WHERE design_id = $1", [design_id])
    } catch (err) {
        return res.status(500).json({message: "Internal error, review not deleted"})
    }
    res.json({message: "Review deleted succesfully"})
}