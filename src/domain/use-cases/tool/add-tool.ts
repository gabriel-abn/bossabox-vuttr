import { UseCase } from "@domain/common";
import { ToolProps } from "@domain/entities";

export namespace AddTool {
  export type Params = {
    title: string;
    link: string;
    description: string;
    tags: string[];
  };

  export type Result = ToolProps & { id: string };
}

export interface AddTool extends UseCase<AddTool.Params, AddTool.Result> {
  execute(params: AddTool.Params): Promise<AddTool.Result>;
}
