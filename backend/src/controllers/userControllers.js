const argon2 = require("argon2");

// Import access to database tables
const tables = require("../tables");

const updateAvatar = async (req, res) => {
  const { userId } = req.params;
  const { avatarId } = req.body;

  try {
    // Vérifiez si l'utilisateur existe
    const existingUser = await tables.User.read(userId);
    if (!existingUser) {
      res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    // Mettez à jour l'avatar dans la base de données
    const updatedUser = await tables.User.updateAvatar(userId, avatarId);

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
    const user = await tables.User.readUserWithAvatar(req.params.id);

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
// Modify the edit function
const edit = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, naissance, civility, password, IsAdmin, avatarId } =
    req.body;

  try {
    // Optional: Verify old password before updating to new one
    const currentUser = await tables.User.read(id);

    if (!currentUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    if (password) {
      const hashedNewPassword = await argon2.hash(password);
      req.body.hashed_password = hashedNewPassword;
    }

    // Update user data (excluding the password if no new password is provided)
    const updatedUser = await tables.User.update(id, {
      name,
      email,
      naissance,
      civility,
      hashed_password: req.body.hashed_password,
      IsAdmin,
      avatarId,
    });

    if (!updatedUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // eslint-disable-next-line camelcase
    const { hashed_password, ...userWithoutPassword } = updatedUser;
    res.status(200).json(userWithoutPassword);
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation

const add = async (req, res, next) => {
  try {
    // Get the data submitted by the user in the request body
    const { name, email, naissance, civility, hashedPassword, avatarId } =
      req.body;

    const civilityValue = civility ? 1 : 0;

    // Add the new item to the database
    const newUser = await tables.User.create({
      name,
      email,
      naissance,
      civility: civilityValue,
      hashedPassword,
      avatarId,
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
