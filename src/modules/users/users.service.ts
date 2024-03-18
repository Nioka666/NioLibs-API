import { Injectable } from '@nestjs/common';
import { usersList } from './data/usersList';

@Injectable()
export class UsersService {
    sayHello(res: any) {
        return res.status(200).send({ message: "Users Route", status: 200 })
    }

    async findAll(res: any): Promise<any> {
        return res.status(200).send({usersList: usersList});
    }    
}
