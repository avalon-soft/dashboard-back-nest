import {
  HttpException,
  Injectable
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {User} from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({ where: { username: createUserDto.email } });
    if (existingUser) {
      throw new HttpException({
        "message": "Validation failed",
        "errors": [
          {
            "property": "email",
            "error": "Email already exists"
          }
        ]
      }, 400);
    }

    const saltOrRounds = 10;
    const newPass = await bcrypt.hash(createUserDto.password, saltOrRounds);

    const user: User = new User({
      name: createUserDto.full_name,
      username: createUserDto.email,
      password: newPass
    });

    const savedUser =  await this.userRepository.save(user);
    delete savedUser.password
    return savedUser

  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username });
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = new User({
      id,
      name: updateUserDto.full_name,
      username: updateUserDto.email,
      password: updateUserDto.password
    });
    return this.userRepository.save(user);
  }

  remove(id: number): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }
}
