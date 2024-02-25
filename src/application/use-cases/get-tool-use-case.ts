import { ApplicationError } from "@application/common";
import { IToolRepository } from "@application/repositories";
import { GetTool } from "@domain/use-cases";

export class GetToolUseCase implements GetTool {
  constructor(private readonly repository: IToolRepository) {}

  async execute({ id }: GetTool.Params): Promise<GetTool.Result> {
    const tool = await this.repository.get({ id });

    if (!tool) {
      throw new ApplicationError("TOOL_NOT_FOUND");
    }

    return { id: tool[0].id, ...tool[0].props };
  }
}
