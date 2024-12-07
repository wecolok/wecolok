import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../user/entities/user.entity';
import { UserInterface } from '../../user.model';
import { compareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { AccessTokenDto } from '../dtos/access-token.dto';
import { UserNotFoundException } from '../../user/exceptions/user-exception';
import { TokensDto } from '../dtos/tokens.dto';
import { AuthServiceGateway } from '../gateways/auth.service.gateway';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { UserDto } from '../../user/dto/user.dto';
import { UserServiceGateway } from '../../user/gateways/user.service.gateway';

@Injectable()
export class AuthService implements AuthServiceGateway {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userServiceGateway: UserServiceGateway,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userServiceGateway.findOneByEmail(email);

    if (!user) {
      throw UserNotFoundException.emailNotFound(email);
    }

    return compareSync(password, user?.password) ? user : null;
  }

  async login(user: UserInterface): Promise<TokensDto> {
    const payload = { user, sub: user.id };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRES'),
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRES'),
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async register(createUserDto: CreateUserDto): Promise<UserDto> {
    return await this.userServiceGateway.create(createUserDto);
  }

  async refresh(refreshToken: string): Promise<AccessTokenDto> {
    const payload = this.jwtService.verify(refreshToken, {
      secret: this.configService.get('JWT_SECRET'),
    });

    const user = await this.userServiceGateway.findOneById(payload.sub);

    if (!user) {
      throw UserNotFoundException.idNotFound(payload.sub);
    }

    const accessToken = this.jwtService.sign(
      { sub: user.id },
      { expiresIn: this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRES') },
    );

    return { accessToken };
  }
}
