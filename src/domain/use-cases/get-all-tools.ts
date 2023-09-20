import { UseCase } from "@domain/common";
import { Tool } from "@domain/entities";

export namespace GetAllTools {
  export type Params = void;

  export type Result = Tool[];
}

export interface GetAllTools extends UseCase<GetAllTools.Params, GetAllTools.Result> {
  execute(params: GetAllTools.Params): Promise<GetAllTools.Result>;
}
