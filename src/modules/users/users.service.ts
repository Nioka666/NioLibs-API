import { Injectable } from "@nestjs/common";
import { usersList } from "./data/usersList";

@Injectable()
export class UsersService {
  sayHello(res: any) {
    return res.status(200).send({ message: "Users Route", status: 200 });
  }

  async findAll(res: any): Promise<any> {
    return res.status(200).send({ usersList: usersList });
  }

  async userSignUp(username: string, pass: string): Promise<any> {
    if (username && pass) {
      return {
        statusCode: 200,
        message: "Sign Up Successfully",
        newUser: {
          username: username,
          password: pass,
        },
      };
    } else {
      return {
        statusCode: 301,
        message: "Sign Up Failed..",
      };
    }
  }
}
