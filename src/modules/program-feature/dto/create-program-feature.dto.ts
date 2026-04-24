import { IsString } from 'class-validator';

export class CreateProgramFeatureDto {
  @IsString()
  description: string;
}
