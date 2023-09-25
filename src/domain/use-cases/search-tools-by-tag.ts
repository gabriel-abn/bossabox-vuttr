import { UseCase } from "@domain/common";
import { ToolProps } from "@domain/entities";

export namespace SearchToolByTag {
  export type Params = Partial<{
    tag: string;
    title: string;
  }>;

  export type Result = ToolProps[];
}

export interface SearchToolByTag extends UseCase<SearchToolByTag.Params, SearchToolByTag.Result> {
  execute(params: SearchToolByTag.Params): Promise<SearchToolByTag.Result>;
}
