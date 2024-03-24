import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class ConnectionsService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: ["info", "query", "warn", "error"],
    });
  }

  async onModuleInit() {
    await this.$connect();
    console.log("Prisma client connected.");
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log("Prisma client disconnected.");
  }
}
