import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {User} from './entities/user.entity';
import {UserModule} from './user.module'
import {Repository} from 'typeorm'
import {TypeOrmModule} from '@nestjs/typeorm';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const UserRepository = Repository<User>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // controllers: [UserController],
      providers: [UserService],
      imports: [UserModule, TypeOrmModule.forFeature([User])],
    }).compile();

    // controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    const createUserDto = {
      full_name: 'test',
      email: 'test@gmail.com',
      password: 'test',
    };
    const result = service.create(createUserDto);
    expect(result).toBeDefined();
    // expect(result.full_name).toBe(createUserDto.full_name);
    // expect(result.email).toBe(createUserDto.email);
    // expect(result.password).toBe(createUserDto.password);
  });
});
