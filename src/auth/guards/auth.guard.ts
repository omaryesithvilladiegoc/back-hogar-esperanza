import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request, Response } from "express";
import { Observable } from "rxjs";
import { JWT_SECRET } from "src/helpers/enviroment";
import { Roles } from "../enums/roles.enum";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {

    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        if (!request.headers.authorization) throw new NotFoundException('No token recivied')
        const token: string = request.headers.authorization.split(' ')[1]
        if (!token) throw new UnauthorizedException('Token required')

        try {
            const secret_key = JWT_SECRET
            const payload = this.jwtService.verify(token,{secret:secret_key})
            payload.exp = new Date(payload.exp * 1000)
            payload.iat = new Date(payload.iat * 1000)

            if(payload.isAdmin) {
                payload.roles = [Roles.ADMIN]
            } {
                payload.roles = [Roles.USER]
            }
            request.user = payload
            return true
        } catch (error) {
            throw new UnauthorizedException('Token invalid')
        }
    }
}