const argon2 = require("argon2");
const tables = require("../tables");

const login = async (req, res, next) => {
  try {
    const user = await tables.User.readByEmail(req.body.email);

    if (user == null) {
      res.sendStatus(422).json({ message: "Invalid email or password" });
      return;
    }

    const verified = await argon2.verify(
      user.hashed_password,
      req.body.password
    );

    if (verified) {
      delete user.hashed_password;
      res.status(200).json({ ...user, message: "Logged in successfully" });
    } else {
      res.sendStatus(422).json({ message: " Invalid email or password " });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
};
