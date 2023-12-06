import { ApplicationError } from "@application/common";
import { DeleteTool } from "@domain/use-cases";
import {
  Controller,
  HttpResponse,
  badRequest,
  ok,
  serverError,
} from "@presentation/common";

export type DeleteToolRequest = {
  id: string;
};

export class DeleteToolController implements Controller {
  constructor(private readonly deleteToolUseCase: DeleteTool) {}

  async handle(request: DeleteToolRequest): Promise<HttpResponse> {
    try {
      await this.deleteToolUseCase.execute({ id: request.id });

      return ok("Deleted successfully.");
    } catch (error) {
      if (error instanceof ApplicationError) {
        return badRequest(error);
      }

      return serverError(error);
    }
  }
}
