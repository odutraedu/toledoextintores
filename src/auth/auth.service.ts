import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  private readonly validToken = 'UNICORNIOcolorido123';

  validadeToken(token: string): void {
    if (token !== this.validToken) {
      throw new UnauthorizedException('Token inválido!');
    } else {
      console.log('Token válido!');
    }
  }
}
