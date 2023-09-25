import { AddToolRepository } from "@application/repositories";
import { Tool } from "@domain/entities";
import { AddTool } from "@domain/use-cases";

export class AddToolUseCase implements AddTool {
  constructor(private readonly addToolRepository: AddToolRepository) {}

  async execute(params: AddTool.Params): Promise<AddTool.Result> {
    const exists = await this.addToolRepository.checkByTitleAndLink(
      params.title,
      params.link,
    );

    if (exists) {
      throw new Error("TOOL_ALREADY_EXISTS");
    }

    const tool = Tool.create({
      title: params.title,
      description: params.description,
      link: params.link,
      tags: params.tags,
    });

    const res = await this.addToolRepository.add(tool);

    return {
      ...res,
    };
  }
}
