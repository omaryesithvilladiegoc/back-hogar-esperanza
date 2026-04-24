import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { CreateProgramFeatureDto } from 'src/modules/program-feature/dto/create-program-feature.dto';

export class CreatePlanDto {
  @IsString()
  title: string;

  @IsString()
  image: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProgramFeatureDto)
  features: CreateProgramFeatureDto[];
}
