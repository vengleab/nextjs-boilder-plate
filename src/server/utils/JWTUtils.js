const jwt = require("jsonwebtoken");
require("dotenv").config();
const env = require("../../../config/env");
const jwtSecret = env.JWT_SECRET;

export default class JWTUtils {
  static sign(payload) {
    return jwt.sign(`${payload}`, jwtSecret);
  }

  static extractPayload(token) {
    return jwt.verify(token, jwtSecret);
  }
}
