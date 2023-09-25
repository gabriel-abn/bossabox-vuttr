import { ToolProps } from "@domain/entities";

export interface GetAllToolsRepository {
  getAll(): Promise<GetAllToolsRepository.Result>;
}

export namespace GetAllToolsRepository {
  export type Result = ToolProps & { id: string }[];
}
