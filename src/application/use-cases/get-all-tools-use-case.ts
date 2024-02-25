import { IToolRepository } from "@application/repositories";
import { GetAllTools } from "@domain/use-cases";

export class GetAllToolsUseCase implements GetAllTools {
  constructor(private readonly repository: IToolRepository) {}

  async execute(): Promise<GetAllTools.Result> {
    return (await this.repository.getAll()).map((tool) => ({
      id: tool.id,
      title: tool.props.title,
      description: tool.props.description,
      link: tool.props.link,
      tags: tool.props.tags,
    }));
  }
}
