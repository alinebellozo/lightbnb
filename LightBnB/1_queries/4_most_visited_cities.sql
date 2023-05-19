SELECT properties.city, count(reservations) AS total_reservations
FROM reservations
LEFT JOIN properties
ON properties.id = property_id
GROUP BY properties.city
ORDER BY total_reservations DESC;