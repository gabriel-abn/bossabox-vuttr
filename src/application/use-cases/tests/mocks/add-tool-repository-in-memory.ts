import { AddToolRepository } from "@application/repositories";
import { Tool } from "@domain/entities";

export class AddToolRepositoryInMemory implements AddToolRepository {
  tools: Array<Tool> = [];
  tags: Map<string, string> = new Map();

  async checkByTitleAndLink(title: string, link: string): Promise<boolean> {
    const tool = this.tools.find(
      (tool) =>
        tool.props.title.toLowerCase() === title.toLowerCase() && tool.props.link.toLowerCase() === link.toLowerCase(),
    );

    if (tool) {
      return true;
    }

    return false;
  }

  async add(params: AddToolRepository.Params): Promise<AddToolRepository.Result> {
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
}
