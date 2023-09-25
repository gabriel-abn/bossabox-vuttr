import { GetToolRepository } from "@application/repositories";
import { GetTool } from "@domain/use-cases";

export class GetToolUseCase implements GetTool {
  constructor(private readonly repository: GetToolRepository) {}

  async execute({ id }: GetTool.Params): Promise<GetTool.Result> {
    const tool = await this.repository.findById(id);

    if (!tool) {
      throw new Error("TOOL_NOT_FOUND");
    }

    return { ...tool.props, id: tool.id };
  }
}
