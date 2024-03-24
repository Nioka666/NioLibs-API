import { Body, Controller, Get, Post, Query, Res } from "@nestjs/common";
import { UsersService } from "./users.service";
import { PrismaService } from "src/prisma/prisma.service";

@Controller("/api/users")
export class UsersController {
  constructor(
    private readonly service: UsersService,
    private readonly prisma: PrismaService,
  ) {}

  @Get("/")
  showAll() {
    return this.service.showAll();
  }

  @Get("/find")
  async findOne(@Query("key") key: string) {
    return this.service.findOne(key);
  }

  @Post("/sign-up")
  async userSignUp(
    @Body() userData: { username: string; password: string },
  ): Promise<any> {
    const { username, password } = userData;
    return this.service.userSignUp({ username, password });
  }

  @Post("/sign-in")
  async userSignIn(
    @Body() userData: { username: string; password: string },
  ): Promise<any> {
    const { username, password } = userData;
    return this.service.userSignIn({ username, password });
  }
}
