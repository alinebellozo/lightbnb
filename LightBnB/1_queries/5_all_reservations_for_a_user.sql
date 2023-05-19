SELECT reservations.id, reservations.start_date, properties.title, properties.cost_per_night, AVG(property_reviews.rating) AS average_rating
FROM reservations
JOIN properties ON reservations.property_id = properties.id
JOIN property_reviews ON properties.id = property_reviews.property_id
GROUP BY properties.id, reservations.id
ORDER BY start_date
LIMIT 10;