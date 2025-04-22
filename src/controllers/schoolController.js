const School = require("../models/School");
const validateSchoolData = require("../validators/schoolValidator");
const calculateDistance = require("../utils/distanceCalculator");

// Add a new school
async function addSchool(req, res) {
  const { name, address, latitude, longitude } = req.body;

  // Validate input data
  const validation = validateSchoolData({
    name,
    address,
    latitude,
    longitude,
  });
  if (!validation.valid) {
    return res.status(400).json({ error: validation.message });
  }

  try {
    const newSchool = await School.create({
      name,
      address,
      latitude,
      longitude,
    });
    return res.status(201).json(newSchool);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to add school" });
  }
}

// List schools sorted by proximity
async function listSchools(req, res) {
  const { latitude, longitude } = req.query;

  // Validate coordinates
  if (
    !latitude ||
    !longitude ||
    isNaN(parseFloat(latitude)) ||
    isNaN(parseFloat(longitude))
  ) {
    return res
      .status(400)
      .json({ error: "Valid latitude and longitude are required" });
  }

  try {
    const schools = await School.findAll();
    const sortedSchools = sortSchoolsByProximity(
      schools,
      parseFloat(latitude),
      parseFloat(longitude)
    );
    return res.status(200).json(sortedSchools);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to retrieve schools" });
  }
}

// Helper function to sort schools by distance
function sortSchoolsByProximity(schools, userLat, userLon) {
  return schools
    .map((school) => {
      const distance = calculateDistance(
        userLat,
        userLon,
        school.latitude,
        school.longitude
      );
      return { ...school, distance };
    })
    .sort((a, b) => a.distance - b.distance);
}

module.exports = {
  addSchool,
  listSchools,
};
