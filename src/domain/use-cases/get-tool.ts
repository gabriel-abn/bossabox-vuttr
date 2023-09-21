import { UseCase } from "@domain/common";
import { ToolProps } from "@domain/entities";

export namespace GetTool {
  export type Params = {
    id: string;
  };

  export type Result = ToolProps;
}

export interface GetTool extends UseCase<GetTool.Params, GetTool.Result> {
  execute(params: GetTool.Params): Promise<GetTool.Result>;
}
