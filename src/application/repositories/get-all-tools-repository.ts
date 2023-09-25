import { GetAllTools } from "@domain/use-cases";

export interface GetAllToolsRepository {
  getAll(): Promise<GetAllToolsRepository.Result>;
}

export namespace GetAllToolsRepository {
  export type Result = GetAllTools.Result;
}
