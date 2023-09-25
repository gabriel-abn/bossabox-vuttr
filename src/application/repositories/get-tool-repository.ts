import { Tool } from "@domain/entities";

export interface GetToolRepository {
  findById(id: string): Promise<GetToolRepository.Result>;
}

export namespace GetToolRepository {
  export type Result = Tool;
}
