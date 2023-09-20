import { UseCase } from "@domain/common";
import { Tool } from "@domain/entities";

export namespace SearchTool {
  export type Params = Partial<{
    tag: string;
    title: string;
  }>;

  export type Result = Tool[];
}

export interface SearchTool extends UseCase<SearchTool.Params, SearchTool.Result> {
  execute(params: SearchTool.Params): Promise<SearchTool.Result>;
}
