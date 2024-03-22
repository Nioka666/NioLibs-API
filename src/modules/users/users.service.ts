import { Injectable } from "@nestjs/common";
import { usersList } from "./data/usersList";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  sayHello(res: any) {
    return res.status(200).send({ message: "Users Route", status: 200 });
  }

  async findOne(key: string) {
    return this.prisma.users.findFirst({
      where: {
        username: key,
      },
    });
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
