const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

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
const read = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const user = await tables.User.read(req.params.id);

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

const readUserWithAvatar = async (req, res, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const user = await tables.User.readUserWithAvatar(req.params.avatarId);

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

const getByToken = async (req, res) => {
  const userInfos = req.auth;

  try {
    if (!userInfos || !userInfos.sub) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const user = await tables.User.readUserWithAvatar(userInfos.sub);

    if (!user) {
      res.sendStatus(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// The E of BREAD - Edit (Update) operation
// Modify the edit function
const edit = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, naissance, civility, password, avatarId } = req.body;

  try {
    // Optional: Verify old password before updating to new one
    const currentUser = await tables.User.read(id);

    let formattedDate = naissance;
    if (!Number.isNaN(Date.parse(naissance))) {
      formattedDate = new Date(naissance).toISOString().slice(0, 10);
    }

    if (!currentUser) {
      res.status(404).json({ error: "User not found" });
    }

    if (password) {
      const hashedNewPassword = await argon2.hash(password);
      req.body.hashed_password = hashedNewPassword;
    }

    // Update user data (excluding the password if no new password is provided)
    const updatedUser = await tables.User.update(id, {
      name,
      email,
      naissance: formattedDate,
      civility,
      hashed_password: req.body.hashed_password,
      avatarId,
      IsAdmin: req.body.IsAdmin || currentUser.IsAdmin,
    });

    if (!updatedUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // eslint-disable-next-line camelcase
    const { hashed_password, ...userWithoutPassword } = updatedUser;
    res.status(200).json(userWithoutPassword);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
    console.error(err);
    next(err);
  }
};

// The A of BREAD - Add (Create) operation

const add = async (req, res, next) => {
  try {
    // Create a new item in the database based on the provided data
    const {
      name,
      email,
      naissance,
      civility,
      hashed_password,
      IsAdmin,
      avatarId,
    } = req.body;

    // Check if the user already exists
    const existingUser = await tables.User.readByEmail(email);

    if (existingUser) {
      res.status(409).json({ error: "User already exists" });
      return;
    }

    if (!hashed_password) {
      res.status(400).json({ error: "Password is required" });
      return;
    }

    // Create the new user in the database
    const newUser = await tables.User.create({
      name,
      email,
      naissance,
      civility,
      hashed_password,
      IsAdmin,
      avatarId,
    });
    const userAvatar = await tables.Avatar.read(avatarId);

    newUser.avatar_filename = userAvatar[0].avatar_filename;
    newUser.avatar_url = userAvatar[0].avatar_url;

    // Respond with the newly created user in JSON format
    if (newUser) {
      const userToken = await jwt.sign(
        { sub: newUser.id, email: newUser.email },
        process.env.APP_SECRET,
        {
          expiresIn: "30m",
        }
      );
      res.status(201).json({
        token: userToken,
        newUser,
      });
    } else {
      res.status(400).json({ error: "Unable to create user" });
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  readUserWithAvatar,
  getByToken,
  edit,
  add,
};
