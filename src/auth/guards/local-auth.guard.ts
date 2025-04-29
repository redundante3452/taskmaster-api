import { Injectable } from "@nestjs/common"; 
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
// Compare this snippet from src/auth/strategies/jwt.strategy.ts: