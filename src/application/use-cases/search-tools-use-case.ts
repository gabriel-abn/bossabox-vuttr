import { SearchToolsRepository } from "@application/repositories";
import { SearchTools } from "@domain/use-cases";

export class SearchToolsUseCase implements SearchTools {
  constructor(private readonly repository: SearchToolsRepository) {}

  async execute(params: SearchTools.Params): Promise<SearchTools.Result> {
    if (params.tag) {
      const tag = await this.repository.checkTag(params.tag);

      if (!tag) {
        throw new Error("INVALID_TAG");
      }

      const tools = await this.repository.getToolsByTag(params.tag);

      return tools.map((tool) => ({
        id: tool.id,
        ...tool.props,
      }));
    } else if (params.title) {
      const tools = await this.repository.getToolsByTitle(params.title);

      if (!tools.length) {
        throw new Error("INVALID_TITLE");
      }

      return tools.map((tool) => ({
        id: tool.id,
        ...tool.props,
      }));
    } else {
      throw new Error("INVALID_PARAMS");
    }
  }
}
