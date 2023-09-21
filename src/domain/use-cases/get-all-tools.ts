import { UseCase } from "@domain/common";
import { ToolProps } from "@domain/entities";

export namespace GetAllTools {
  export type Params = void;

  export type Result = ToolProps[];
}

export interface GetAllTools extends UseCase<GetAllTools.Params, GetAllTools.Result> {
  execute(params: GetAllTools.Params): Promise<GetAllTools.Result>;
}
