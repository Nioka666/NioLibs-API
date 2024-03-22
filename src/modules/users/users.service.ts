import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
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
      const saltRounds = 10;
      const hashedPass = await bcrypt.hash(pass, saltRounds);

      return this.prisma.users.create({
        data: {
          nama_lengkap: "Nama Lengkap",
          username: username,
          email: "email@gmail.com",
          password: hashedPass,
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

  async userSignIn(username: string, pass: string) {
    const currentUser = await this.prisma.users.findFirst({
      where: {
        username: username,
      },
    });

    if (!currentUser) {
      return {
        statusCode: 500,
        message: "internal service error",
      };
    }

    const isMatch = await bcrypt.compare(pass, currentUser?.password);

    if (isMatch) {
      return {
        statusCode: 200,
        message: "sign in successfully",
      };
    } else {
      return {
        statusCode: 301,
        message: "sign in failed",
      };
    }
  }
}
