import {
  CheckByTitleAndLinkRepository,
  IToolRepository,
} from "@application/repositories";
import { Tool } from "@domain/entities";
import { AddTool } from "@domain/use-cases";

export class AddToolUseCase implements AddTool {
  constructor(
    private readonly repo: IToolRepository,
    private readonly checkByTitleAndLink: CheckByTitleAndLinkRepository,
  ) {}

  async execute(params: AddTool.Params): Promise<AddTool.Result> {
    const exists = await this.checkByTitleAndLink.check(
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

    await this.repo.save(tool);

    return {
      id: tool.id,
      title: tool.props.title,
      description: tool.props.description,
      link: tool.props.link,
      tags: tool.props.tags,
    };
  }
}
