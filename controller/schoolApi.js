const {
  addSchool,
  getSchoolsSortedByProximity,
} = require("../model/schoolModel");


const addSchoolHandler = async (req, res) => {
  const { id, name, address, latitude, longitude } = req.body;

  if (
    !id ||
    !name ||
    !address ||
    typeof latitude !== "number" ||
    typeof longitude !== "number"
  ) {
    return res.status(400).json({ error: "Invalid input data." });
  }

  try {
    const schoolId = await addSchool(id, name, address, latitude, longitude);
    res.status(201).json({ message: "School added successfully.", schoolId });
  } catch (error) {
    console.error("Error adding school:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};


// List schools
 
const listSchoolsHandler = async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ error: "Latitude and longitude are required." });
  }

  try {
    const userLatitude = parseFloat(latitude);
    const userLongitude = parseFloat(longitude);

    if (isNaN(userLatitude) || isNaN(userLongitude)) {
      return res.status(400).json({ error: "Invalid latitude or longitude." });
    }

    const schools = await getSchoolsSortedByProximity(
      userLatitude,
      userLongitude
    );
    res.status(200).json(schools);
  } catch (error) {
    console.error("Error listing schools:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = { addSchoolHandler, listSchoolsHandler };
