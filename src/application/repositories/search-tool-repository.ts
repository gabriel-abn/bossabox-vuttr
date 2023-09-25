import { Tool } from "@domain/entities";

export interface SearchToolsRepository {
  checkTag(tag: string): Promise<boolean>;
  getToolsByTag(tag: string): Promise<Tool[]>;
  getToolsByTitle(title: string): Promise<Tool[]>;
}
