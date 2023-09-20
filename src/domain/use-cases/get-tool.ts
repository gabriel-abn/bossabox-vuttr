import { UseCase } from "@domain/common";
import { Tool } from "@domain/entities";

export namespace GetTool {
  export type Params = {
    id: string;
  };

  export type Result = Tool;
}

export interface GetTool extends UseCase<GetTool.Params, GetTool.Result> {
  execute(params: GetTool.Params): Promise<GetTool.Result>;
}
