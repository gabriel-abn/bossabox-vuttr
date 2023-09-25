import {
  AddToolRepository,
  DeleteToolRepository,
  GetAllToolsRepository,
  GetToolRepository,
  SearchToolsRepository,
} from "@application/repositories";
import { Tool } from "@domain/entities";

export class ToolRepositoryInMemory
  implements
    AddToolRepository,
    DeleteToolRepository,
    GetAllToolsRepository,
    GetToolRepository,
    SearchToolsRepository
{
  tools: Array<Tool> = [];
  tags: Map<string, string> = new Map();

  async checkByTitleAndLink(title: string, link: string): Promise<boolean> {
    const tool = this.tools.find(
      (tool) =>
        tool.props.title.toLowerCase() === title.toLowerCase() &&
        tool.props.link.toLowerCase() === link.toLowerCase(),
    );

    if (tool) {
      return true;
    }

    return false;
  }

  async add(
    params: AddToolRepository.Params,
  ): Promise<AddToolRepository.Result> {
    this.tools.push(params);

    params.props.tags.map((tag) => {
      if (!this.tags.has(tag)) {
        this.tags.set(tag, params.id);
      } else {
        const tools = this.tags.get(tag);
        if (tools) {
          this.tags.set(tag, `${tools};${params.id}`);
        }
      }
    });

    return {
      id: params.id,
      title: params.props.title,
      link: params.props.link,
      description: params.props.description,
      tags: params.props.tags,
    };
  }

  async delete(id: string): Promise<boolean> {
    const tool = this.tools.find((tool) => tool.id === id);

    if (!tool) {
      return false;
    }

    const index = this.tools.indexOf(tool);
    this.tools.splice(index, 1);

    tool.props.tags.map((tag) => {
      const tools = this.tags.get(tag);
      if (tools) {
        const newTools = tools.split(";").filter((toolId) => toolId !== id);
        if (newTools.length > 0) {
          this.tags.set(tag, newTools.join(";"));
        } else {
          this.tags.delete(tag);
        }
      }
    });

    return true;
  }

  async getAll(): Promise<GetAllToolsRepository.Result> {
    return this.tools.map((tool) => ({
      id: tool.id,
      title: tool.props.title,
      link: tool.props.link,
      description: tool.props.description,
      tags: tool.props.tags,
    }));
  }

  async findById(id: string): Promise<GetToolRepository.Result> {
    return this.tools.find((tool) => tool.id === id);
  }

  async checkTag(tag: string): Promise<boolean> {
    return this.tags.has(tag);
  }

  async getToolsByTag(tag: string): Promise<Tool[]> {
    const tools = this.tags.get(tag);

    if (!tools) {
      return [];
    }

    const toolsIds = tools.split(";");
    const toolsList = this.tools.filter((tool) => toolsIds.includes(tool.id));

    return toolsList;
  }

  async getToolsByTitle(title: string): Promise<Tool[]> {
    return this.tools.filter((tool) => tool.props.title.includes(title));
  }
}
