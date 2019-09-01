import JWTUtils from "../utils/JWTUtils";
import UserModel from "../models/user";
import UnauthorizedAcess from "../Response/UnauthorizedAcess";

module.exports = (req, res, next) => {
  const authurization = req.header("authorization");
  const [authType, token] = authurization ? authurization.split(" ") : [];

  if (authType === "Bearer" && token) {
    let userId = undefined;
    try {
      userId = JWTUtils.extractPayload(token).userId;
    } catch (error) {
      return new UnauthorizedAcess(res).setMessage("Invalid token").send();
    }
    Object.assign(req.body, { userId });
    req.user = UserModel.find({ _id: userId, accessToken: token });
    return next();
  }
  return new UnauthorizedAcess(res).send();
};
