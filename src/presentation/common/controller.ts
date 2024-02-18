import { ApplicationError } from "@application/common";
import { z } from "zod";
import { HttpRequest, HttpResponse, badRequest, ok, serverError } from "./http";

abstract class Controller<T = any> {
  abstract run(request: T): Promise<any | HttpResponse>;
  schema: z.ZodObject<any, any, any>;

  constructor(schema: z.ZodObject<any, any, any>) {
    if (!schema) {
      this.schema = z.object({});
    }

    this.schema = schema;
  }

  async handle(request: HttpRequest<T>): Promise<HttpResponse> {
    try {
      const params = this.schema.safeParse(request.data);

      if (params.success === false) {
        return badRequest({
          message: "Invalid request.",
          errors: params.error.errors.map((error) => error.message),
        });
      }

      const response = await this.run({ ...request.data });

      if (typeof response.status != "undefined") {
        return response;
      }

      return ok(response);
    } catch (err) {
      if (err instanceof ApplicationError) {
        return badRequest(err.message);
      }

      return serverError(err.message);
    }
  }
}

export default Controller;
