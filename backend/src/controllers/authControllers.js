const tables = require("../tables");

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await tables.user.readByEmail(email);

  if (user && user.password === password) {
    res.status(200).send(user);
  } else {
    res.status(400).send("incorrect email or password");
  }
};

module.exports = {
  login,
};
