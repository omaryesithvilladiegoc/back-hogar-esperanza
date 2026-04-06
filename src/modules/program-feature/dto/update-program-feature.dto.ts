import { PartialType } from "@nestjs/swagger";
import { CreateProgramFeatureDto } from "./create-program-feature.dto";

export class UpdateProgramFeatureDto extends PartialType(CreateProgramFeatureDto) {

}