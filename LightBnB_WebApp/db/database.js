const properties = require("./json/properties.json");
const users = require("./json/users.json");

const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "lightbnb",
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithEmail = (email) => {

  return pool
  .query(`
  SELECT *
  FROM users
  WHERE users.email = $1
  `,
  [email]
  )
  .then((result) => {
    if (result.rows) {
      return result.rows[0];
    } else {
      return null;
    }
  })
  .catch((err) => {
    console.log(err.message);
  });
};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {

  return pool
  .query(`
  SELECT *
  FROM users
  WHERE users.id = $1
  `,
  [id])
  .then((result) => {
    if (result.rows) {
      return result.rows[0];
    } else {
      return null;
    }
  })
  .catch((err) => {
    console.log(err.message);
  });
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {

  const objValues = [user.name, user.email, user.password];

  return pool
  .query(`
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *
  `,
  objValues
  )
  .then((result) => {
    if (result.rows) {
      return result.rows[0];
    } else {
      return null;
    }
  })
  .catch((err) => {
    console.log(err.message);
  });
};

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  return pool
  .query(`
  SELECT reservations.*, properties.*
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  WHERE guest_id = $1
  LIMIT $2
  `,
  [guest_id, limit]
  )
  .then((result) => {
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
};

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = (options, limit = 10) => {

  // 1. Setup an array to hold any parameters that may be available for the query
  const queryParams = [];

  // 2. Start the query with all information that comes before the WHERE clause
  let queryString = `
  SELECT properties.*, AVG(property_reviews.rating) AS average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  // 3. Check if the filters have been passed in as an option
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length}`;
  }

  if (options.owner_id) {
    queryParams.push(options.owner_id);
    if (queryParams.length === 1) {
      queryString += `WHERE owner_id = $${queryParams.length}`;
    } else {
      queryString += `AND owner_id = $${queryParams.length}`;
    }
  }

  if (options.minimum_price_per_night) {
    queryParams.push(
      options.minimum_price_per_night * 100
    );
    if (queryParams.length === 2) {
      queryString += `WHERE cost_per_night >= $${queryParams.length}`;
    }
  };

  if (options.maximum_price_per_night) {
    queryParams.push(options.maximum_price_per_night * 100);
    if (queryParams.length === 3) {
      queryString += `WHERE cost_per_night <= $${queryParams.length}`;
    }
  }

  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryString += `HAVING AVG(property_reviews.rating) >= $${queryParams.length}`;
  }

  // 4. Add any query that comes after the WHERE clause
  queryParams.push(limit);
  
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length}
  `;
  
  // 5. Console log everything just to make sure we've done it right
  console.log(queryString, queryParams);

  // 6. Run the query
  return pool
  .query(queryString, queryParams)
  .then((result) => result.rows)
  .catch((err) => {
    console.log(err.message);
  });
};

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const objValues = [
    property.owner_id,
    property.title,
    property.description,
    property.thumbnail_photo_url,
    property.cover_photo_url,
    property.cost_per_night,
    property.street,
    property.city,
    property.province,
    property.post_code,
    property.country,
    property.parking_spaces,
    property.number_of_bathrooms,
    property.number_of_bedrooms,
  ];

  return pool
  .query(`
  INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *
  `,
  objValues
  )
  .then((result) => {
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
