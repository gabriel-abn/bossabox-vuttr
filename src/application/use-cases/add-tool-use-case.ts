import { AddToolRepository } from "@application/repositories";
import { AddTool } from "@domain/use-cases";

export class AddToolUseCase implements AddTool {
  constructor(private readonly repo: AddToolRepository) {}

  async execute(params: AddTool.Params): Promise<AddTool.Result> {
    throw new Error("Method not implemented.");
  }
}
