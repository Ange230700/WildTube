// Import access to database tables
const tables = require("../tables");

const updateAvatar = async (req, res) => {
  const { userId } = req.params;
  const { avatar } = req.body;

  try {
    // Vérifiez si l'utilisateur existe
    const existingUser = await tables.User.read(userId);
    if (!existingUser) {
      res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    // Mettez à jour l'avatar dans la base de données
    const updatedUser = await tables.User.updateAvatar(userId, avatar);

    // Répondre avec les informations mises à jour de l'utilisateur
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating avatar:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour de l'avatar" });
  }
};

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
const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const user = await tables.user.read(req.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  // Get the ID of the item to be updated from the request parameters
  const { id } = req.params;
  // Get the new data from the request body
  const { name, email, naissance } = req.body;

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
  read,
  edit,
  add,
  updateAvatar,
};
