// controllers/dataController.js
const pool = require("../config/database");

exports.getLocations = async (req, res) => {
    const categoryName = req.body.categoryName; // Nhận tên danh mục từ frontend

    try {
        const results = await pool.query(
            `SELECT 
    l.*,
    MAX(CASE WHEN i.is_primary = TRUE THEN i.image_url END) AS primary_image,
    STRING_AGG(CASE WHEN i.is_primary = FALSE THEN i.image_url END, ', ') AS other_images
FROM locations l
JOIN location_categories lc ON l.location_id = lc.location_id
JOIN categories c ON lc.category_id = c.category_id
LEFT JOIN images i ON l.location_id = i.location_id
WHERE c.name = $1
GROUP BY l.location_id, l.name, l.address;`,
            [categoryName]
        );

        res.json(results.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
};
