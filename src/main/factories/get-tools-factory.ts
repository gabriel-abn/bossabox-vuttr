import {
  GetAllToolsUseCase,
  GetToolUseCase,
  SearchToolsUseCase,
} from "@application/use-cases";
import toolsRepository from "@infra/persistence/repositories/tools-repository";
import { GetToolsController } from "@presentation/controllers/get-tools-controller";

export class GetToolsFactory {
  static make() {
    return new GetToolsController(
      new GetToolUseCase(toolsRepository),
      new GetAllToolsUseCase(toolsRepository),
      new SearchToolsUseCase(toolsRepository),
    );
  }
}
