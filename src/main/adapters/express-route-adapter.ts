import Controller from "@presentation/common/controller";
import { Request, Response } from "express";

const adaptRoute = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    const { body, params, query } = request;

    const result = await controller.handle({
      data: { ...body, ...params },
      query,
    });

    if (result.status >= 200 && result.status <= 299) {
      return response.status(result.status).send(result.body);
    }

    return response.status(result.status).send({
      error: result.body,
    });
  };
};

export default adaptRoute;
