const db = require("../connection/db");
const addSchool = async (id, name, address, latitude, longitude) => {
  const query = `
      INSERT INTO school (id,name, address, latitude, longitude) 
      VALUES (?,?, ?, ?, ?)
    `;
  const [result] = await db.query(query, [
    id,
    name,
    address,
    latitude,
    longitude,
  ]);
  return result.insertId;
};

//  Retrieve all schools 
 
const getSchoolsSortedByProximity = async (userLatitude, userLongitude) => {
  const query = `
      SELECT 
        id,
        name,
        address,
        latitude,
        longitude,
        (
            6371 * ACOS(
                COS(RADIANS(?)) * COS(RADIANS(latitude)) * COS(RADIANS(longitude) - RADIANS(?)) +
                SIN(RADIANS(?)) * SIN(RADIANS(latitude))
            )
        ) AS distance
      FROM school
      ORDER BY distance ASC;
    `;
  const [school] = await db.query(query, [
    userLatitude,
    userLongitude,
    userLatitude,
  ]);
  return school;
};

module.exports = { addSchool, getSchoolsSortedByProximity };
