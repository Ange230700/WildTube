// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all items from the database
    const users = await tables.User.readAll();

    // Respond with the items in JSON format
    res.json(users);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation

// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  // Get the ID of the item to be updated from the request parameters
  const { id } = req.params;
  // Get the new data from the request body
  const { name, email, naissance } = req.body;
  const avatar = req.file ? req.file.path : null;

  let formattedDate = naissance;
  if (!Number.isNaN(Date.parse(naissance))) {
    formattedDate = new Date(naissance).toISOString().slice(0, 10);
  }

  try {
    // Update the item in the database
    const updatedUser = await tables.User.update(id, {
      name,
      email,
      naissance: formattedDate,
      avatar,
    });

    // Respond with the updated item in JSON format
    if (!updatedUser) {
      res.status(400).json({ message: "Bad Request" });
    } else {
      res.json(updatedUser);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation

const add = async (req, res, next) => {
  try {
    // Get the data submitted by the user in the request body
    const { name, email, naissance, civility, hashedPassword } = req.body;

    // Add the new item to the database
    const newUser = await tables.User.create({
      name,
      email,
      naissance,
      civility,
      hashedPassword,
    });

    // Respond with the newly added item in JSON format
    if (!newUser) {
      res.status(400).json({ message: "Bad Request" });
    } else {
      res.status(201).json(newUser);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented

// Ready to export the controller functions
module.exports = {
  browse,
  edit,
  add,
};
