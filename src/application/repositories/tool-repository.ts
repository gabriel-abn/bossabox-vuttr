import { Tool } from "@domain/entities";

export interface IToolRepository {
  save(tool: Tool): Promise<void>;
  getAll(): Promise<Tool[]>;
  delete(id: string): Promise<boolean>;
  get(filter: {
    id?: string;
    title?: string;
    tags?: string[];
  }): Promise<Tool[]>;
  update(id: string, tool: Tool): Promise<void>;
}

export interface CheckByTitleAndLinkRepository {
  check(title: string, link: string): Promise<boolean>;
}
