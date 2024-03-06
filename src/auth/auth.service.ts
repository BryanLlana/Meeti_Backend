import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs'
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.userRepository.findOneBy({email: createUserDto.email})
    if (userExists) throw new BadRequestException('Usuario existente')
    try {
      const { password, ...values } = createUserDto
      const user = this.userRepository.create({
        ...values,
        password: bcrypt.hashSync(password, 10)
      })
      await this.userRepository.save(user)
      return {
        ...user,
        token: this.getJwtToken({ id: user.id })
      }
    } catch (error) {
      console.log(error)
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const userExists = await this.userRepository.findOneBy({ email: loginUserDto.email })
    if (!userExists) throw new NotFoundException('Usuario no registrado')
    if (!bcrypt.compareSync(loginUserDto.password, userExists.password)) throw new BadRequestException('Password incorrecto')
    if (!userExists.active) throw new BadRequestException('Usuario inactivo')

    return {
      ...userExists,
      token: this.getJwtToken({ id: userExists.id })
    }
  }

  private getJwtToken (payload: JwtPayload) {
    const token = this.jwtService.sign(payload)
    return token
  }

  async editProfile (updateUserDto: UpdateUserDto, user: User) {
    user.name = updateUserDto.name
    user.description = updateUserDto.description
    user.email = updateUserDto.email
    await this.userRepository.save(user)
  }
}
