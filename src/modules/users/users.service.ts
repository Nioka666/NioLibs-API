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
      return this.prisma.users.create({
        data: {
          nama_lengkap: "Nama Lengkap",
          username: username,
          email: "email@gmail.com",
          password: pass,
          alamat: null,
          tanggal_bergabung: new Date(),
        },
      });
    } else {
      return {
        statusCode: 301,
        message: "Sign Up Failed..",
      };
    }
  }
}
