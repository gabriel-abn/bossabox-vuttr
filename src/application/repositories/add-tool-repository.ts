import { Tool, ToolProps } from "@domain/entities";

export interface AddToolRepository {
  checkByTitleAndLink: (title: string, link: string) => Promise<boolean>;
  add: (params: AddToolRepository.Params) => Promise<AddToolRepository.Result>;
}

export namespace AddToolRepository {
  export type Params = Tool;
  export type Result = ToolProps & { id: string };
}
