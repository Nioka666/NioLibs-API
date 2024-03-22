import { Controller, Get, Query, Res } from "@nestjs/common";
import { UsersService } from "./users.service";
import { PrismaService } from "src/prisma/prisma.service";

@Controller("/api/users")
export class UsersController {
  constructor(
    private readonly service: UsersService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  sayHello(@Res() res: any) {
    return this.service.sayHello(res);
  }

  @Get("/list")
  findAll(@Res() res: any) {
    return this.service.findAll(res);
  }

  @Get("/db-list")
  async showAll() {
    const result = await this.prisma.users.findMany();
    return result;
  }

  @Get("sign-up")
  async userSignIn(
    @Query("username") username: string,
    @Query("pass") pass: string,
  ): Promise<any> {
    return this.service.userSignUp(username, pass);
  }
}
