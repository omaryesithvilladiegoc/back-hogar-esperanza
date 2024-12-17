import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class UpdatePostDto  {

    @IsNumber()

  @ApiProperty({
    description: 'actualizar la medida de post',
    example: 5,
  })
    size:number
}
