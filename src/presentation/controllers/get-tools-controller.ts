import { GetAllTools, GetTool, SearchTools } from "@domain/use-cases";
import { HttpRequest } from "@presentation/common";
import Controller from "@presentation/common/controller";
import { z } from "zod";

const getToolsSchema = z.object({
  id: z.string().optional(),
});

export type GetToolsRequest = z.infer<typeof getToolsSchema>;

export class GetToolsController extends Controller<GetToolsRequest> {
  constructor(
    private readonly getTools: GetTool,
    private readonly getAllTools: GetAllTools,
    private readonly searchTools: SearchTools,
  ) {
    super(getToolsSchema);
  }

  async run(request: HttpRequest<GetToolsRequest>): Promise<any> {
    const { id } = request.data;
    const { tags, title } = request.query;

    if (id) {
      return await this.getTools.execute({ id });
    }

    if (tags || title) {
      return await this.searchTools.execute({ tags, title });
    }

    return await this.getAllTools.execute();
  }
}
