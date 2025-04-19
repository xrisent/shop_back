import { Body, Controller, Post, UseGuards, Request, ConflictException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiBody({ type: LoginUserDto })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @ApiBody({ type: RegisterUserDto })
  async register(@Body() registerUserDto: RegisterUserDto) {
    const existingUser = await this.userService.findOneEmail(registerUserDto.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    const user = await this.userService.create(registerUserDto);
    
    const { email, password } = registerUserDto;
    const validatedUser = await this.authService.validateUser(email, password);
    return this.authService.login(validatedUser);
  }
}