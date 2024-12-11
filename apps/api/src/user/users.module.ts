import { Module } from "@nestjs/common";
import { UserService } from "./services/user.service";
import { UserController } from "./controllers/user.controller";
import { User } from "./entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserServiceGateway } from "./gateways/user.service.gateway";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    {
      provide: UserServiceGateway,
      useClass: UserService,
    },
  ],
  exports: [UserServiceGateway],
})
export class UsersModule {}
