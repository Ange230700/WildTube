const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const tables = require("../tables");

const login = async (req, res, next) => {
  try {
    const user = await tables.User.readByEmail(req.body.email);

    if (!user) {
      res.sendStatus(422).json({ message: "Invalid email or password" });
      return;
    }

    if (user && user.hashed_password) {
      const verified = await argon2.verify(
        user.hashed_password,
        req.body.password
      );

      if (verified) {
        // delete user.hashed_password;
        const token = await jwt.sign({ sub: user.id }, process.env.APP_SECRET, {
          expiresIn: "30m",
        });
        res.status(200).json({
          token,
          user,
          message: "Logged in successfully",
        });
      } else {
        res.sendStatus(422).json({ message: " Invalid email or password " });
      }
    } else {
      res.sendStatus(422);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  login,
};
