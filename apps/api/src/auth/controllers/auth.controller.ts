import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGard } from '../guards/auth.guard';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { TokensDto } from '../dtos/tokens.dto';
import { AccessTokenDto } from '../dtos/access-token.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthServiceGateway } from '../gateways/auth.service.gateway';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { UserDto } from '../../user/dto/user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authServiceGateway: AuthServiceGateway) {}

  @ApiOperation({ summary: 'Login with credentials' })
  @ApiResponse({ status: HttpStatus.OK, type: TokensDto })
  @UseGuards(LocalAuthGard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Request() req: any): Promise<TokensDto> {
    return this.authServiceGateway.login(req.body);
  }

  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: HttpStatus.CREATED, type: UserDto })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.authServiceGateway.register(createUserDto);
  }

  @ApiOperation({ summary: 'Refresh access token' })
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({ status: HttpStatus.OK, type: AccessTokenDto })
  @Post('refresh')
  async refreshToken(@Body() dto: RefreshTokenDto): Promise<AccessTokenDto> {
    return this.authServiceGateway.refresh(dto.refreshToken);
  }
}
