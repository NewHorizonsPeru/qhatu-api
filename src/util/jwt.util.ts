import UserDto from "../dtos/user.dto";
import jwt from "jsonwebtoken";
import enviroment from "../config/enviroment.config";

const generateJwt = (user: UserDto) => {
  const payload = {
    sub: user.id,
    fullName: `${user.firstName} ${user.lastName}`,
    role: user.role,
  };

  const options: jwt.SignOptions = {
    expiresIn: "1h",
  };

  const jwtoken = jwt.sign(payload, enviroment.SecretKey!, options);
  return jwtoken;
};

export { generateJwt };
