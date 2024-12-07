import { User } from 'src/user/entities/user.entity';
import { AccessTokenDto } from '../dtos/access-token.dto';
import { TokensDto } from '../dtos/tokens.dto';
import { AuthServiceGateway } from '../gateways/auth.service.gateway';
import { UserCannotBeCreatedException } from '../../user/exceptions/user-exception';
import { UserDto } from '../../user/dto/user.dto';
import { CreateUserDto } from '../../user/dto/create-user.dto';

export class AuthServiceStub implements AuthServiceGateway {
  validateUser(email: string, password: string): Promise<UserDto> {
    throw new Error('Method not implemented.');
  }

  login(user: User): Promise<TokensDto> {
    return Promise.resolve({
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    });
  }

  register(createUserDto: CreateUserDto): Promise<UserDto> {
    if (createUserDto.email === 'john@doe.fr') {
      throw UserCannotBeCreatedException.emailAlreadyExists(
        createUserDto.email,
      );
    }

    return Promise.resolve({
      id: 2,
      email: createUserDto.email,
      firstname: createUserDto.firstname,
      lastname: createUserDto.lastname,
    });
  }

  refresh(refreshToken: string): Promise<AccessTokenDto> {
    return Promise.resolve({
      accessToken: 'accessToken',
    });
  }
}
