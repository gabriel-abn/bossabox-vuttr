export type ToolProps = {
  id: number;
  name: string;
  description: string;
  link: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
};

export class Tool {
  constructor(readonly props: ToolProps) {}
}
