import UserModel from "../models/user";
import Success from "../Response/Success";
import BadRequest from "../Response/BadRequest";

module.exports = {
  async me(req, res) {
    try {
      const userId = req.body.userId;
      console.log(userId);

      const user = await UserModel.findOne({ _id: userId });

      if (!user) throw new Error("Not found");

      user.password = undefined;
      return new Success(res).send(user);
    } catch (error) {
      return new BadRequest(res).send(error);
    }
  },
  async creatUser(req, res) {
    try {
      const { username, password, email } = req.body;
      if (!username || !password || !email) {
        return new BadRequest(res).send();
      }

      const user = new UserModel({ username, password, email });
      return new Success(res).send(await user.save());
    } catch (error) {
      return new BadRequest(res).send(error);
    }
  }
};
