import { Tool, ToolProps } from "@domain/entities";

export interface AddToolRepository {
  add: (params: AddToolRepository.Params) => Promise<AddToolRepository.Result>;
}

export namespace AddToolRepository {
  export type Params = Tool;
  export type Result = ToolProps & { id: string };
}
