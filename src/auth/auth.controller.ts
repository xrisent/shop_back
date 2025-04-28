import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  ConflictException,
  Get,
  Headers,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBody,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtAuth } from './auth.decorator';

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
    const existingUser = await this.userService.findOneEmail(
      registerUserDto.email,
    );
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    const user = await this.userService.create(registerUserDto);

    const { email, password } = registerUserDto;
    const validatedUser = await this.authService.validateUser(email, password);
    return this.authService.login(validatedUser);
  }

  @JwtAuth()
  @Get('verify-admin')
  @ApiOperation({ summary: 'Verify if token belongs to admin' })
  @ApiResponse({
    status: 200,
    description: 'Returns admin status',
    type: Object,
  })
  async verifyAdmin(@Headers() headers: Record<string, string>) {
    const authHeader = headers.authorization || headers.Authorization;

    if (!authHeader) {
      return { isAdmin: false };
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return { isAdmin: false };
    }

    try {
      const isAdmin = await this.authService.verifyAdminToken(token);
      return { isAdmin };
    } catch (e) {
      return { isAdmin: false };
    }
  }

  @JwtAuth()
  @Get('profile')
  @ApiOperation({ summary: 'Getting profile info' })
  @ApiResponse({
    status: 200,
    description: 'Returns user profile',
    type: Object,
  })
  async getProfile(@Headers() headers: Record<string, string>) {
    const authHeader = headers.authorization || headers.Authorization;

    if (!authHeader) {
      return {};
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return {};
    }

    try {
      const user = await this.authService.getProfile(token);
      return user;
    } catch (e) {
      return {};
    }
  }
}
