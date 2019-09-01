// var users = [{ id:1 , email: 'hongly@slash.co', password: '123' }];
const userModel = require("../models/user");
const bcrypt = require("bcrypt");

import JWTUtils from "../utils/JWTUtils";
import Success from "../Response/Success";
import UnauthorizedAcess from "../Response/UnauthorizedAcess";
import BadRequest from "../Response/BadRequest";
module.exports = {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (email && password) {
        const user = await userModel.findOne({ email });
        if (!user || !bcrypt.compareSync(password, user.password)) {
          return new UnauthorizedAcess(res).setMessage(
            "Email or Password is incorrect"
          );
        }
        return new Success(res)
          .setMessage("Login successfully")
          .send({ token: JWTUtils.sign({ userId: user._id }) });
      } else {
        return new BadRequest(res).send();
      }
    } catch (error) {
      return new BadRequest(res).setMessage(error.message).send();
    }
  }
};
