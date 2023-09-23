import { randomUUID } from "crypto";

export type ToolProps = {
  name: string;
  description: string;
  link: string;
  tags: string[];
};

export class Tool {
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(
    readonly props: ToolProps,
    readonly id: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = randomUUID().split("-")[0].toUpperCase() ?? id;
    this.createdAt = new Date() ?? createdAt;
    this.updatedAt = new Date() ?? updatedAt;

    this.props.tags = this.props.tags.map((tag) => tag.toLowerCase());
  }

  static restore(props: ToolProps, id: string, createdAt: Date, updatedAt: Date) {
    const tool = new Tool(props, id, createdAt, updatedAt);
    return tool;
  }
}
