import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { UpdateProgramFeatureDto } from 'src/modules/program-feature/dto/update-program-feature.dto';

export class UpdatePlanDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateProgramFeatureDto)
  features?: UpdateProgramFeatureDto[];
}