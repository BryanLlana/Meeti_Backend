import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorator/get-user.decorator';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto)
  }

  @Get('user/:id')
  findUser(@Param('id') id: string) {
    return this.authService.findUser(id)
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(@GetUser() user: User) {
    return {
      ok: true,
      user
    }
  }

  @Post('edit-profile')
  @UseGuards(AuthGuard())
  editProfile(@Body() updateUserDto: UpdateUserDto ,@GetUser() user: User) {
    this.authService.editProfile(updateUserDto, user)
  }
}
