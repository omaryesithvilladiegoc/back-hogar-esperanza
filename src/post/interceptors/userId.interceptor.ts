import { CallHandler, ExecutionContext, NestInterceptor, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable, tap } from "rxjs";
import { JWT_SECRET } from "src/helpers/enviroment";


export class UserIdInterceptor implements NestInterceptor {

    constructor( private readonly jwtService: JwtService){
       
    }
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest()
        const token = request.user
        const body = request.body
        
        if(!token) throw new  UnauthorizedException('Toquen required')
        const secret_key = JWT_SECRET
        try {
           body.idUser = token.id
           return next
      .handle()
      .pipe(
        tap(() => request.body = body),
      );

        } catch (error) {
            throw new UnauthorizedException('There was an error')

        }

       
        
      
        
        
        
    }
}