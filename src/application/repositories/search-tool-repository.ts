import { Tool } from "@domain/entities";

export interface SearchToolsRepository {
  checkTag(tag: string): Promise<boolean>;
  getTools(tag: string): Promise<Tool[]>;
}
