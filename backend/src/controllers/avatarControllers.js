// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (request, response, next) => {
  try {
    // Fetch all items from the database
    const avatars = await tables.Avatar.readAll();

    // Respond with the items in JSON format
    if (avatars) {
      response.status(200).json(avatars);
    } else {
      response.status(404).json({ error: "No avatar found" });
    }
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const avatar = await tables.Avatar.read(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (avatar == null) {
      res.sendStatus(404);
    } else {
      res.json(avatar);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
};
