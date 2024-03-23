import { Injectable, Post } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class AdminsService {
  constructor(private readonly prisma: PrismaService) {}

  getAdminsList() {
    return this.prisma.admins.findMany();
  }

  async getAdmin(key: Prisma.AdminsWhereUniqueInput): Promise<any> {
    return this.prisma.admins.findUnique({
      where: key,
    });
  }
}
