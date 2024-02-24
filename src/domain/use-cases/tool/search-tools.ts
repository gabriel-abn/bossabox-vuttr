import { UseCase } from "@domain/common";
import { ToolProps } from "@domain/entities";

export namespace SearchTools {
  export type Params = Partial<{
    tag: string;
    title: string;
  }>;

  export type Result = (ToolProps & { id: string })[];
}

export interface SearchTools
  extends UseCase<SearchTools.Params, SearchTools.Result> {
  execute(params: SearchTools.Params): Promise<SearchTools.Result>;
}
