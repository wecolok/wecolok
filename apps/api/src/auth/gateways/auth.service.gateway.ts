import { User } from "../../user/entities/user.entity";
import { TokensDto } from "../dtos/tokens.dto";
import { AccessTokenDto } from "../dtos/access-token.dto";
import { UserDto } from "../../user/dto/user.dto";
import { CreateUserDto } from "../../user/dto/create-user.dto";

export abstract class AuthServiceGateway {
  abstract validateUser(email: string, password: string): Promise<UserDto>;

  abstract login(user: User): Promise<TokensDto>;

  abstract register(createUserDto: CreateUserDto): Promise<UserDto>;

  abstract refresh(refreshToken: string): Promise<AccessTokenDto>;
}
