import { Body, Controller, Get, Post } from "@nestjs/common";
import { AdminsService } from "./admins.service";
import { Admins } from "@prisma/client";

@Controller("/api/admins")
export class AdminsController {
  constructor(private readonly service: AdminsService) {}

  @Post()
  getAdminsList() {
    return this.service.getAdminsList();
  }

  @Post("/find")
  async getAdmin(@Body() key: { username: string }): Promise<Admins> {
    const { username } = key;
    return await this.service.getAdmin({ username: username });
  }
}
