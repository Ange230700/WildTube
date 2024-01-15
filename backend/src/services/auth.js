const argon2 = require("argon2");

const hashPassword = async (req, res, next) => {
  try {
    const { password } = req.body;

    if (!password) {
      console.warn(req.body);
      throw new Error("Password is undefined");
    }

    const hashedPassword = await argon2.hash(password);

    req.body.hashed_password = hashedPassword;

    delete req.body.password;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  hashPassword,
};
