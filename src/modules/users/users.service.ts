import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  showAll() {
    return this.prisma.users.findMany();
  }

  async findOne(key: string) {
    return this.prisma.users.findFirst({
      where: {
        username: key,
      },
    });
  }

  async userSignUp(userData: Prisma.UsersWhereUniqueInput): Promise<any> {
    if (userData.username && userData.password) {
      const saltRounds = 10;
      const userPass: any = userData.password;
      const hashedPass = await bcrypt.hash(userPass, saltRounds);

      try {
        return await this.prisma.users.create({
          data: {
            nama_lengkap: "Nama Lengkap",
            username: userData.username,
            email: "email@gmail.com",
            password: hashedPass,
            alamat: null,
            tanggal_bergabung: new Date(),
          },
        });
      } catch (error) {
        return {
          statusCode: 400,
          message: error,
        };
      }
    } else {
      return {
        statusCode: 400,
        message: "Bad Request: Unknown",
      };
    }
  }

  async userSignIn(userData: Prisma.UsersWhereUniqueInput) {
    const currentUser = await this.prisma.users.findUnique({
      where: {
        username: userData.username,
      },
    });

    if (!currentUser) {
      return {
        statusCode: 500,
        message: "internal service error",
      };
    }

    const pass: any = userData.password;
    const isMatch = await bcrypt.compare(pass, currentUser?.password);

    if (isMatch) {
      return {
        statusCode: 200,
        message: `${currentUser?.password}`,
      };
    } else {
      return {
        statusCode: 301,
        message: "sign in failed",
      };
    }
  }
}
