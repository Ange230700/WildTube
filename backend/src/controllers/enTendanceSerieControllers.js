// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const tendances = await tables.En_Tendance_Serie.readAll();

    // Respond with the items in JSON format
    res.json(tendances);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const tendances = await tables.En_Tendance_Serie.read(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (tendances == null) {
      res.sendStatus(404);
    } else {
      res.json(tendances);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the item data from the request body
  const tendances = req.body;

  try {
    // Insert the item into the database
    const insertId = await tables.En_Tendance_Serie.create(tendances);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(200).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented
const destroy = async (req, res, next) => {
  const { id: userId } = req.params;
  const { serieId } = req.body;
  try {
    const [result] = await tables.En_Tendance_Serie.delete(userId, serieId);
    if (result.affectedRows) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  add,
  destroy,
};
