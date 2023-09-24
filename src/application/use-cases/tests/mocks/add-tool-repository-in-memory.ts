import { AddToolRepository } from "@application/repositories";
import { Tool } from "@domain/entities";

export class AddToolRepositoryInMemory implements AddToolRepository {
  tools: Array<Tool> = [];
  tags: Map<string, string> = new Map();

  async add(params: AddToolRepository.Params): Promise<AddToolRepository.Result> {
    this.tools.map((tool) => {
      if (
        tool.props.title.toLowerCase() === params.props.title.toLowerCase() &&
        tool.props.link.toLowerCase() === params.props.link.toLowerCase()
      ) {
        throw new Error("Tool already exists");
      }
    });

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
