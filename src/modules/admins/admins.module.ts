import { Module } from "@nestjs/common";
import { AdminsService } from "./admins/admins.service";
import { AdminsController } from "./admins/admins.controller";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  providers: [AdminsService, PrismaService],
  controllers: [AdminsController],
})
export class AdminsModule {}
