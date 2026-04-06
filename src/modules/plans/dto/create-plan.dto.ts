import { CreateProgramFeatureDto } from "src/modules/program-feature/dto/create-program-feature.dto";

export class CreatePlanDto {
    title: string;
    image: string;
    features: CreateProgramFeatureDto[];
}
