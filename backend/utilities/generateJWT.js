const jwt = require("jsonwebtoken");
module.exports = async function generateJWT(id) {
  const token = await jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

  return token;
};
