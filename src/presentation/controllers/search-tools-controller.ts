import { SearchTools } from "@domain/use-cases";
import {
  Controller,
  HttpResponse,
  badRequest,
  ok,
  serverError,
} from "@presentation/common";

type SearchToolsRequest = {
  tag?: string;
  title?: string;
};

class SearchToolsController implements Controller {
  constructor(private readonly useCase: SearchTools) {}

  async handle(request: SearchToolsRequest): Promise<HttpResponse> {
    try {
      if (!request.tag && !request.title) {
        return badRequest("INVALID_PARAMS");
      }

      const tools = await this.useCase.execute(request);

      return ok(tools);
    } catch (error) {
      if (error.message === "INVALID_TITLE") {
        return badRequest(error.message);
      }

      return serverError(error.message);
    }
  }
}

export default SearchToolsController;
