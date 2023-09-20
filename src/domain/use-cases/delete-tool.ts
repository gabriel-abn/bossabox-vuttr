import { UseCase } from "@domain/common";

export namespace DeleteTool {
  export type Params = {
    id: string;
  };

  export type Result = boolean;
}

export interface DeleteTool extends UseCase<DeleteTool.Params, DeleteTool.Result> {
  execute(params: DeleteTool.Params): Promise<DeleteTool.Result>;
}
