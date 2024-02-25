import { ApplicationError } from "@application/common";
import { IToolRepository } from "@application/repositories";
import { SearchTools } from "@domain/use-cases";

export class SearchToolsUseCase implements SearchTools {
  constructor(private readonly repository: IToolRepository) {}

  async execute(params: SearchTools.Params): Promise<SearchTools.Result> {
    if (params.tags) {
      const tools = await this.repository.get({ tags: params.tags });

      if (!tools.length) {
        throw new ApplicationError("NO_TOOLS_FOUND_WITH_TAGS");
      }

      return tools.map((tool) => ({
        id: tool.id,
        ...tool.props,
      }));
    } else if (params.title) {
      const tools = await this.repository.get({ title: params.title });

      if (!tools.length) {
        throw new ApplicationError("NO_TOOLS_FOUND_WITH_TITLE");
      }

      return tools.map((tool) => ({
        id: tool.id,
        ...tool.props,
      }));
    } else {
      const tools = await this.repository.getAll();

      return tools.map((tool) => ({
        id: tool.id,
        ...tool.props,
      }));
    }
  }
}
