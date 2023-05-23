import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from '../user/entities/user.entity';
import { CreateUserDto } from '../user/dto/user.dto';
import { httpMessage } from '../__core/messages/http.message';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ActivityType } from '../__core/enums/activity-type.enum';
import { Origin } from '../__core/enums/origin.enum';
import { ILoginActivityPayload } from '../__core/interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async createAccount(createAuthDto: CreateUserDto) {
    const user = await this.userRepository.findOne({ 
      where: { username: createAuthDto.username } 
    });

    if(user) {
      throw new BadRequestException(httpMessage["0D000"]);
    }

    // SAVE USER
    const salt = bcrypt.genSaltSync(10);
    await this.userRepository.save({
      ...createAuthDto, 
      salt,
      password: bcrypt.hashSync(createAuthDto.password, salt)
    });
    
    return httpMessage["00000"];
  }

  async loginAccount(body: any) {
    const user = await this.userRepository.findOne({ 
      where: { username: body.username } 
    });

    if(!user) {
      throw new BadRequestException(httpMessage["0A002"]);
    }

    const isMatch = await bcrypt.compare(body.password, user.password);
    if(!isMatch) {
      throw new BadRequestException(httpMessage["0A002"]);
    }

    this.eventEmitter.emit("account.login", {
      type: ActivityType.LOGIN,
      editor: user,
      owner: user,
      origin: Origin.WEB,
      details: "Login successfully",
      ipAddress: "127.0.0.1"
    } as ILoginActivityPayload);

    return {
      access_token: await this.jwtService.signAsync({
        id: user.id,
        username: user.username,
        role: user.role
      }),
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
