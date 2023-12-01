import { AddTool } from "@domain/use-cases";
import {
  Controller,
  HttpResponse,
  badRequest,
  ok,
  serverError,
} from "@presentation/common";

export type AddToolRequest = {
  title: string;
  link: string;
  description: string;
  tags: string[];
};

export class AddToolController implements Controller<AddToolRequest> {
  constructor(private readonly useCase: AddTool) {}

  async handle(request: AddToolRequest): Promise<HttpResponse> {
    try {
      const response = await this.useCase.execute(request);

      return ok(response);
    } catch (err) {
      if (err.name === "ApplicationError") {
        return badRequest(err.message);
      }

      return serverError(err.message);
    }
  }
}
