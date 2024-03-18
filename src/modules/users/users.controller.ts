import { Controller, Get, Res } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('/api/users')
export class UsersController {
    constructor(private readonly service: UsersService) { }

    @Get()
    sayHello(@Res() res: any) {
        return this.service.sayHello(res);
    }

    @Get('/list')
    findAll(@Res() res: any) {
        return this.service.findAll(res);
    }
}
