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

  @Get("/db-list")
  async showAll() {
    return await this.prisma.users.findMany();
  }

  @Get("/find")
  async findOne(@Query("key") key: string) {
    return this.service.findOne(key);
  }

  @Get("sign-up")
  async userSignUp(
    @Query("username") username: string,
    @Query("pass") pass: string,
  ): Promise<any> {
    return this.service.userSignUp(username, pass);
  }

  @Get("sign-in")
  async userSignIn(
    @Query("username") username: string,
    @Query("pass") pass: string,
  ): Promise<any> {
    return this.service.userSignIn(username, pass);
  }
}
