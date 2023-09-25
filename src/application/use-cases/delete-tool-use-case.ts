import { DeleteToolRepository } from "@application/repositories";
import { DeleteTool } from "@domain/use-cases";

export class DeleteToolUseCase implements DeleteTool {
  constructor(private readonly repository: DeleteToolRepository) {}

  async execute({ id }: DeleteTool.Params): Promise<boolean> {
    const deleted = await this.repository.delete(id);

    return deleted;
  }
}
