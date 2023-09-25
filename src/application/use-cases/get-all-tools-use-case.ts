import { GetAllToolsRepository } from "@application/repositories";
import { GetAllTools } from "@domain/use-cases";

export class GetAllToolsUseCase implements GetAllTools {
  constructor(private readonly repository: GetAllToolsRepository) {}

  async execute(): Promise<GetAllTools.Result> {
    return await this.repository.getAll();
  }
}
