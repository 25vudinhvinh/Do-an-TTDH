// controllers/dataController.js
const pool = require("../config/database");

exports.getLocations = async (req, res) => {
    const categoryName = req.body.categoryName; // Nhận tên danh mục từ frontend

    try {
        const results = await pool.query(
            `SELECT 
    l.location_id,
    l.name,
    l.address,
    l.latitude,
    l.longitude,
    l.open_hours,
    l.description,
    l.additional_services,
    l.created_at,
    COALESCE(MAX(CASE WHEN i.is_primary = TRUE THEN i.image_url END), '') AS primary_image,
    COALESCE(STRING_AGG(CASE WHEN i.is_primary = FALSE THEN i.image_url END, ', '), '') AS other_images,
    STRING_AGG(DISTINCT c2.name, ', ') AS category_names,
    COALESCE(AVG(r.rating)::FLOAT, 0) AS average_rating,
    COUNT(DISTINCT r.review_id) AS review_count,  -- Đếm các đánh giá duy nhất
    COALESCE(STRING_AGG(DISTINCT ri.image_url, ', '), '') AS review_image_urls
FROM locations l
JOIN location_categories lc ON l.location_id = lc.location_id
JOIN categories c ON lc.category_id = c.category_id
LEFT JOIN images i ON l.location_id = i.location_id
LEFT JOIN location_categories lc2 ON l.location_id = lc2.location_id
LEFT JOIN categories c2 ON lc2.category_id = c2.category_id
LEFT JOIN reviews r ON l.location_id = r.location_id
LEFT JOIN review_images ri ON r.review_id = ri.review_id
WHERE c.name = $1
GROUP BY 
    l.location_id,
    l.name,
    l.address,
    l.latitude,
    l.longitude,
    l.open_hours,
    l.description,
    l.additional_services,
    l.created_at;`,
            [categoryName]
        );

        res.json(results.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
};
